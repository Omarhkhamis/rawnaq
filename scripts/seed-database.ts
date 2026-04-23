import { getDashboardSnapshot } from "../src/lib/content/repository";

async function main() {
  const snapshot = await getDashboardSnapshot();

  console.log(
    JSON.stringify(
      {
        sections: Object.keys(snapshot.sections),
        projects: snapshot.projects.length,
        media: snapshot.media.length,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

