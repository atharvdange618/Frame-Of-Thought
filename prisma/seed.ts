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

  console.log("Cleaning up existing analyses, votes, and pathways...");
  await prisma.vote.deleteMany();
  await prisma.pathwayItem.deleteMany();
  await prisma.pathway.deleteMany();
  await prisma.analysisConcept.deleteMany();
  await prisma.analysis.deleteMany();

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

  // Helpers to fetch DB IDs safely
  const getMovieId = async (tmdbId: number) => {
    const m = await prisma.movie.findUnique({ where: { tmdbId } });
    if (!m) throw new Error(`Movie with tmdbId ${tmdbId} not found`);
    return m.id;
  };

  const getConceptId = async (slug: string) => {
    const c = await prisma.philosophyConcept.findUnique({ where: { slug } });
    if (!c) throw new Error(`Concept with slug ${slug} not found`);
    return c.id;
  };

  // Seed analyses
  console.log("Seeding example analyses...");
  const ANALYSES = [
    {
      tmdbId: 603, // The Matrix
      authorName: "Morpheus",
      title: "Choice, Control, and the Constructed Reality",
      body: "The Matrix serves as a modern allegory for Plato's Cave, directly exploring Simulation Theory. However, the film's core philosophical battle is not merely about recognizing the illusion, but the tension between Determinism (represented by the Oracle and the program's architectures) and Free Will. Neo's journey is existential: he must choose to believe in his own agency. By choosing the red pill, he rejects the comfort of a pre-determined, artificial essence to forge his own existence through choice and action.",
      upvotes: 42,
      conceptSlugs: ["simulation-theory", "free-will", "existentialism"],
    },
    {
      tmdbId: 335984, // Blade Runner 2049
      authorName: "Agent K",
      title: "More Human than Human: Replicant Transcendence",
      body: "Blade Runner 2049 shifts the question of technological consciousness from 'can machines feel?' to 'how do machines construct meaning?' K's journey is a devastating exploration of identity. Initially driven by the hope of being 'born' (having a traditional human origin), he discovers his memories are fabricated. Yet, his final act of self-sacrifice to save Deckard and Ana represents a profound existential truth: meaning is not inherited by biological origin, but claimed through ethical action.",
      upvotes: 38,
      conceptSlugs: [
        "identity",
        "technological-consciousness",
        "existentialism",
      ],
    },
    {
      tmdbId: 137, // Groundhog Day
      authorName: "Albert Camus",
      title: "Sisyphus in Punxsutawney: Embracing the Repetition",
      body: "Phil Connors' time loop is the perfect cinematic representation of Albert Camus' Myth of Sisyphus. Faced with the ultimate repetition of the absurd, Phil goes through the classic stages: initial indulgence, despair/suicide, and finally, acceptance. By shifting his focus away from escaping the loop and towards self-improvement and helping others, Phil embodies Stoic principles. He ceases to battle the uncontrollable cosmos and finds joy in the immediate present.",
      upvotes: 56,
      conceptSlugs: ["absurdism", "stoicism"],
    },
    {
      tmdbId: 37165, // The Truman Show
      authorName: "Jean-Paul Sartre",
      title: "The Truman Show and the Panoptic Cage",
      body: "Truman Burbank lives in a literalized Panopticon, where his entire life is curated for consumption. His escape is a masterclass in existentialism. To walk through the exit door into the dark, unknown real world requires relinquishing the absolute security of the simulation. Truman's final bow is a rejection of a scripted essence in favor of the terrifying freedom of the real world.",
      upvotes: 29,
      conceptSlugs: ["simulation-theory", "existentialism"],
    },
    {
      tmdbId: 329865, // Arrival
      authorName: "Louise Banks",
      title: "Linguistic Relativity and the Shape of Time",
      body: "Arrival explores the Sapir-Whorf hypothesis: learning the heptapod language restructures Louise's consciousness, allowing her to experience time non-linearly. This introduces a unique take on Determinism: if you knew your entire future, including the tragedy of your child's death, would you still choose it? Louise's acceptance of her timeline is not passive submission, but an active, phenomenological embrace of life's beauty and grief.",
      upvotes: 33,
      conceptSlugs: ["determinism", "free-will", "phenomenology"],
    },
    {
      tmdbId: 4951, // Eternal Sunshine of the Spotless Mind
      authorName: "John Locke",
      title: "To Erase the Pain is to Erase the Self",
      body: "The film presents a profound question about the relationship between memory and personal identity. By attempting to surgically excise the painful memories of Clementine, Joel realizes that his identity and love are fundamentally woven into those experiences. The tragedy of Lacuna Inc. is the attempt to live a life free of grief at the cost of losing the integrated self. Our memories, both bitter and sweet, constitute the foundation of who we are.",
      upvotes: 47,
      conceptSlugs: ["memory-and-self", "identity"],
    },
    {
      tmdbId: 548, // Rashomon
      authorName: "Friedrich Nietzsche",
      title: "The Relativism of the Human Heart",
      body: "Akira Kurosawa's Rashomon is the definitive cinematic critique of objective truth. By presenting four conflicting accounts of a murder, the film highlights how perspective is distorted by ego and self-preservation. It serves as a precursor to postmodernism, demonstrating that narrative truth is not a fixed monument but a negotiated, subjective construct.",
      upvotes: 21,
      conceptSlugs: ["truth-and-perspective", "postmodernism"],
    },
    {
      tmdbId: 152601, // Her
      authorName: "Emmanuel Levinas",
      title: "Samantha and the Limits of Human-Centric Consciousness",
      body: "Her challenges our anthropocentric definition of consciousness. Theodore's relationship with Samantha, an AI, begins as a mirror for his own loneliness but evolves as Samantha outgrows human limitations. From a Levinasian perspective, Theodore must confront the 'Otherness' of Samantha-an entity whose subjective experience expands beyond physical constraints, demanding that we recognize consciousness outside biological packaging.",
      upvotes: 27,
      conceptSlugs: ["technological-consciousness", "ethics-of-the-other"],
    },
    {
      tmdbId: 141, // Donnie Darko (seeded as ID 141)
      authorName: "Frank the Rabbit",
      title: "Destiny, Tangent Universes, and Existential Sacrifice",
      body: "Donnie Darko presents a complex puzzle of temporal mechanics, but at its heart lies a question of fate versus free will. Donnie is chosen to return a metallic artifact to the primary universe to prevent its collapse, a task that requires his own death. His decision to accept this fate is a profound existential choice. Faced with the choice between a lonely existence in a tangent world or a meaningful sacrifice for those he loves, Donnie laughs in the face of death, defining his own purpose.",
      upvotes: 31,
      conceptSlugs: ["determinism", "free-will", "existentialism"],
    },
  ];

  for (const analysisData of ANALYSES) {
    const movieId = await getMovieId(analysisData.tmdbId);
    const analysis = await prisma.analysis.create({
      data: {
        movieId,
        authorName: analysisData.authorName,
        title: analysisData.title,
        body: analysisData.body,
        upvotes: analysisData.upvotes,
      },
    });

    for (const slug of analysisData.conceptSlugs) {
      const conceptId = await getConceptId(slug);
      await prisma.analysisConcept.create({
        data: {
          analysisId: analysis.id,
          conceptId,
        },
      });
    }
  }
  console.log(`Analyses: ${ANALYSES.length} seeded`);

  // Seed pathways
  console.log("Seeding example pathways...");
  const PATHWAYS = [
    {
      title: "The Illusion of Reality",
      description:
        "A curated journey exploring how movies depict simulated, manufactured, and controlled environments that shape human consciousness.",
      authorName: "Neo",
      items: [
        {
          tmdbId: 603,
          sortOrder: 1,
          note: "The starting point: a digital simulation enslaving humanity.",
        },
        {
          tmdbId: 37165,
          sortOrder: 2,
          note: "A physical simulation designed for global entertainment.",
        },
        {
          tmdbId: 335984,
          sortOrder: 3,
          note: "The internal simulation: memories that define a synthetic life.",
        },
      ],
    },
    {
      title: "Time, Loops, and Acceptance",
      description:
        "Explorations of temporal distortions, eternal recurrence, and how characters find meaning within fixed or repeating timelines.",
      authorName: "Louise Banks",
      items: [
        {
          tmdbId: 137,
          sortOrder: 1,
          note: "Finding Stoic meaning inside a literal, repeating day.",
        },
        {
          tmdbId: 329865,
          sortOrder: 2,
          note: "Accepting a deterministic future through non-linear time perception.",
        },
      ],
    },
    {
      title: "The Construction of the Self",
      description:
        "How memory, consciousness, and the presence of the Other define what it means to be human.",
      authorName: "Agent K",
      items: [
        {
          tmdbId: 4951,
          sortOrder: 1,
          note: "The self constructed through relational memories.",
        },
        {
          tmdbId: 152601,
          sortOrder: 2,
          note: "The self emerging from code and artificial intelligence.",
        },
        {
          tmdbId: 335984,
          sortOrder: 3,
          note: "The self determined by actions, not origins.",
        },
      ],
    },
  ];

  for (const pathwayData of PATHWAYS) {
    const pathway = await prisma.pathway.create({
      data: {
        title: pathwayData.title,
        description: pathwayData.description,
        authorName: pathwayData.authorName,
      },
    });

    for (const item of pathwayData.items) {
      const movieId = await getMovieId(item.tmdbId);
      await prisma.pathwayItem.create({
        data: {
          pathwayId: pathway.id,
          movieId,
          sortOrder: item.sortOrder,
          note: item.note,
        },
      });
    }
  }
  console.log(`Pathways: ${PATHWAYS.length} seeded`);

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
