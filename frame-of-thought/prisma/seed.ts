import "dotenv/config";
import { prisma } from "@/lib/prisma";
import { getMovie, getPosterUrl, getYear } from "../lib/tmdb";

const TMDB_IDS = [
  603, // The Matrix (1999)
  335984, // Blade Runner 2049 (2017)
  137, // Groundhog Day (1993)
  37165, // The Truman Show (1998)
  329865, // Arrival (2016)
  545611, // Everything Everywhere All At Once (2022)
  4951, // Eternal Sunshine of the Spotless Mind (2004)
  152601, // Her (2013)
  4960, // Synecdoche, New York (2008)
  939, // Stalker (1979)
  548, // Rashomon (1950)
  141, // Waking Life (2001)
];

const CONCEPTS = [
  {
    name: "Existentialism",
    slug: "existentialism",
    description:
      "The  philosophical belief that existence precedes essence - we are thrown into the  world without inherent purpose and must create our own meaning through choice and action.",
  },
  {
    name: "Absurdism",
    slug: "absurdism",
    description:
      "The conflict between  humanity's desire to find meaning in life and the universe's refusal to provide it. Camus argued we must embrace this contradiction and live fully despite it.",
  },
  {
    name: "Nihilism",
    slug: "nihilism",
    description:
      "The rejection of all  religious and moral principles, often accompanied by the belief that life lacks objective meaning, purpose, or intrinsic value.",
  },
  {
    name: "Stoicism",
    slug: "stoicism",
    description:
      "An ancient philosophy teaching that virtue is the highest good and that we should focus on what we can control while accepting what we cannot.",
  },
  {
    name: "Determinism",
    slug: "determinism",
    description:
      "The theory that allevents, including human actions, are ultimately determined by causes external to the will - calling into question free will itself.",
  },
  {
    name: "Simulation Theory",
    slug: "simulation-theory",
    description:
      "The  hypothesis that reality as we know it could be a simulated construct - an artificial environment indistinguishable from 'base' reality.",
  },
  {
    name: "Identity",
    slug: "identity",
    description:
      "What constitutes the self? Is identity tied to memory, consciousness, the body, or something else entirely?",
  },
  {
    name: "Phenomenology",
    slug: "phenomenology",
    description:
      "The study of structures of consciousness as experienced from the first-person point of view - how things appear to us in our lived experience.",
  },
  {
    name: "Postmodernism",
    slug: "postmodernism",
    description:
      "A skeptical philosophical stance that questions grand narratives, objective truth, and the notion of universal meaning - emphasizing multiple perspectives and interpretations.",
  },
  {
    name: "Utilitarianism",
    slug: "utilitarianism",
    description:
      "The ethical theory that the best action is the one that maximizes overall happiness or well-being for the greatest number of people.",
  },
  {
    name: "Free Will",
    slug: "free-will",
    description:
      "The capacity of agents to make choices free from certain kinds of constraints - a central debate in philosophy touching morality, responsibility, and human agency.",
  },
  {
    name: "Ethics of the Other",
    slug: "ethics-of-the-other",
    description:
      "Levinas's idea that our ethical responsibility arises from the face-to-face encounter with another person - the Other demands a response from us before any rational deliberation.",
  },
  {
    name: "Memory & Self",
    slug: "memory-and-self",
    description:
      "Exploring how memory forms personal identity - if you lose your memories, do you lose yourself? Can we trust our memories to tell us who we are?",
  },
  {
    name: "Technological Consciousness",
    slug: "technological-consciousness",
    description:
      "Can machines, AI, or digital entities be conscious? What does it mean to have a mind - and could technology ever replicate or birth genuine experience?",
  },
  {
    name: "Truth & Perspective",
    slug: "truth-and-perspective",
    description:
      "Is truth absolute or constructed through individual and cultural lenses? Can two contradictory accounts of the same event both be true?",
  },
];

async function seedMovie(tmdbId: number) {
  const tmdb = await getMovie(tmdbId);
  const year = tmdb.release_date ? getYear(tmdb.release_date) : 0;
  const posterUrl = getPosterUrl(tmdb.poster_path);

  return prisma.movie.upsert({
    where: { tmdbId },
    update: {},
    create: {
      tmdbId,
      title: tmdb.title,
      year,
      director: tmdb.director ?? "unknown",
      posterUrl,
      description: tmdb.overview,
    },
  });
}

async function main() {
  console.log("🎬 Seeding Deep Screen database...");

  // Seed movies from TMDB
  console.log(`Fetching ${TMDB_IDS.length} movies from TMDB...`);
  const movies = await Promise.allSettled(TMDB_IDS.map((id) => seedMovie(id)));

  let moviesSeeded = 0;
  let moviesFailed = 0;
  for (const result of movies) {
    if (result.status === "fulfilled") moviesSeeded++;
    else moviesFailed++;
  }
  console.log(`Movies: ${moviesSeeded} seeded, ${moviesFailed} failed`);

  // Seed concepts
  console.log(`Seeding ${CONCEPTS.length} philosophy concepts...`);
  for (const concept of CONCEPTS) {
    await prisma.philosophyConcept.upsert({
      where: { slug: concept.slug },
      update: {},
      create: concept,
    });
  }
  console.log(`Concepts: ${CONCEPTS.length} seeded`);

  console.log("✅ Seed complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
