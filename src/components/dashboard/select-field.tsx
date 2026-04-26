"use client";

import {
  Children,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type ReactNode,
  type SelectHTMLAttributes,
} from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown } from "lucide-react";

type SelectOption = {
  value: string;
  label: ReactNode;
  disabled?: boolean;
};

type OptionElementProps = {
  value?: string;
  children?: ReactNode;
  disabled?: boolean;
};

type OptgroupElementProps = {
  children?: ReactNode;
};

type SelectFieldProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> & {
  children: ReactNode;
  optionLayout?: "list" | "grid";
  renderOption?: (option: SelectOption, selected: boolean) => ReactNode;
  renderSelectedOption?: (option: SelectOption | null) => ReactNode;
};

type DropdownPosition = {
  left: number;
  top: number;
  width: number;
  maxHeight: number;
  openUp: boolean;
};

function buildOptions(children: ReactNode) {
  const options: SelectOption[] = [];

  Children.forEach(children, (child) => {
    if (!isValidElement<OptionElementProps | OptgroupElementProps>(child)) {
      return;
    }

    if (child.type === "option") {
      const props = child.props as OptionElementProps;

      options.push({
        value: String(props.value ?? ""),
        label: props.children,
        disabled: props.disabled,
      });
      return;
    }

    if (child.type === "optgroup") {
      const props = child.props as OptgroupElementProps;

      Children.forEach(props.children, (nestedChild) => {
        if (!isValidElement<OptionElementProps>(nestedChild) || nestedChild.type !== "option") {
          return;
        }

        const nestedProps = nestedChild.props;

        options.push({
          value: String(nestedProps.value ?? ""),
          label: nestedProps.children,
          disabled: nestedProps.disabled,
        });
      });
    }
  });

  return options;
}

export function SelectField({
  children,
  className,
  disabled,
  onChange,
  optionLayout = "list",
  renderOption,
  renderSelectedOption,
  value,
  ...props
}: SelectFieldProps) {
  const options = useMemo(() => buildOptions(children), [children]);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<DropdownPosition | null>(null);
  const normalizedValue = value == null ? "" : String(value);
  const selectedOption =
    options.find((option) => option.value === normalizedValue) ?? options[0] ?? null;
  const isGridLayout = optionLayout === "grid";

  function updatePosition() {
    if (!buttonRef.current) {
      return;
    }

    const rect = buttonRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - rect.bottom - 12;
    const spaceAbove = rect.top - 12;
    const openUp = spaceBelow < 240 && spaceAbove > spaceBelow;

    setPosition({
      left: rect.left,
      top: openUp ? rect.top - 8 : rect.bottom + 8,
      width: rect.width,
      maxHeight: Math.max(160, Math.min(320, openUp ? spaceAbove : spaceBelow)),
      openUp,
    });
  }

  function emitChange(nextValue: string) {
    onChange?.({
      target: { value: nextValue },
      currentTarget: { value: nextValue },
    } as ChangeEvent<HTMLSelectElement>);
  }

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    updatePosition();

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;

      if (
        buttonRef.current?.contains(target) ||
        dropdownRef.current?.contains(target)
      ) {
        return;
      }

      setIsOpen(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    function handleLayoutChange() {
      updatePosition();
    }

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleLayoutChange);
    window.addEventListener("scroll", handleLayoutChange, true);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleLayoutChange);
      window.removeEventListener("scroll", handleLayoutChange, true);
    };
  }, [isOpen]);

  return (
    <>
      <select
        {...props}
        className="sr-only"
        disabled={disabled}
        onChange={onChange}
        tabIndex={-1}
        value={normalizedValue}
      >
        {children}
      </select>

      <button
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`flex min-h-[3.125rem] w-full items-center justify-between gap-3 rounded-2xl border border-line bg-black/20 px-4 py-3 text-sm text-text outline-none transition focus:border-primary/60 ${disabled ? "cursor-not-allowed opacity-60" : ""} ${className ?? ""}`}
        disabled={disabled}
        onClick={() => {
          if (disabled) {
            return;
          }

          setIsOpen((current) => !current);
        }}
        ref={buttonRef}
        type="button"
      >
        {renderSelectedOption ? (
          renderSelectedOption(selectedOption)
        ) : (
          <span className={`truncate text-start ${normalizedValue ? "text-text" : "text-text-muted"}`}>
            {selectedOption?.label ?? ""}
          </span>
        )}
        <ChevronDown
          className={`size-4 shrink-0 text-text-muted transition ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && position
        ? createPortal(
            <div
              className="z-[260] overflow-hidden rounded-2xl border border-line bg-[var(--background-soft)] shadow-2xl"
              ref={dropdownRef}
              style={{
                left: position.left,
                maxHeight: position.maxHeight,
                position: "fixed",
                top: position.top,
                transform: position.openUp ? "translateY(-100%)" : undefined,
                width: position.width,
              }}
            >
              <div
                className={`max-h-[inherit] overflow-y-auto p-1.5 ${isGridLayout ? "grid grid-cols-[repeat(auto-fill,minmax(3.5rem,1fr))] gap-2" : ""}`}
              >
                {options.map((option) => {
                  const isSelected = option.value === normalizedValue;

                  return (
                    <button
                      className={`${isGridLayout ? "flex aspect-square w-full items-center justify-center rounded-[1rem] border p-2" : "flex w-full items-center justify-between gap-3 rounded-[1rem] px-4 py-3 text-sm"} transition ${isSelected ? "border-primary/50 bg-primary/12 text-text" : `${isGridLayout ? "border-line/70 bg-white/5 text-text-muted hover:border-primary/40 hover:bg-white/8 hover:text-text" : "border-transparent text-text-muted hover:bg-white/5 hover:text-text"}`} ${option.disabled ? "cursor-not-allowed opacity-50" : ""}`}
                      disabled={option.disabled}
                      key={option.value || "__empty__"}
                      onClick={() => {
                        if (option.disabled) {
                          return;
                        }

                        emitChange(option.value);
                        setIsOpen(false);
                      }}
                      type="button"
                      >
                      {renderOption ? (
                        renderOption(option, isSelected)
                      ) : (
                        <span className="truncate text-start">{option.label}</span>
                      )}
                      {isSelected && !isGridLayout ? <Check className="size-4 shrink-0 text-primary" /> : null}
                    </button>
                  );
                })}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
