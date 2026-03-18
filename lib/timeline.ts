interface Timeline {
	date: string;
	logo: string;
	link: string;
	company: string;
	roles: Role[];
}

interface ClientOrg {
	name: string;
	link: string;
	logo: string;
}

interface Role {
	position: string;
	description: string[];
	technologies: string[];
	href: string | null;
	hook: string | null;
	clients?: ClientOrg[];
}

const timeline: Timeline[] = [
	{
		date: "2022 - Present",
		company: "Iterative",
		logo: "https://www.google.com/s2/favicons?domain=iterative.vc&sz=64",
		link: "https://iterative.vc/",
		roles: [
			{
				position: "Investments & Engineering (Sole Engineer)",
				description: [
					"Own the full data and tooling stack at a Singapore-headquartered early-stage VC fund \u2014 reduced deal screening time by automating sourcing, diligence, and portfolio operations end-to-end.",
					"Shipped an AI-powered MCP Server that unified multi-source deal data into a single query interface, becoming the team's default research tool with tracked NPS.",
					"Automated founder first-call scheduling and outreach using a Voice AI pipeline, freeing the investment team to focus on high-signal conversations.",
					"Built a 9-product internal tooling suite that replaced manual workflows across deal flow, SLA monitoring, and portfolio analytics \u2014 used daily by the entire team.",
					"Surfaced that ~70% of SLA breaches correlated with company events through a 37-week, 1,181-application analysis, directly informing ops resourcing decisions.",
					"Co-led Technical Office Hours for 70+ portfolio founders, bridging engineering expertise into founder support and CTO advisory.",
				],
				technologies: ["python", "nextjs", "supabase", "openai", "postgresql", "bigquery"],
				href: null,
				hook: null,
			},
		],
	},
	{
		date: "2023 - Present",
		company: "Fracxional",
		logo: "https://www.google.com/s2/favicons?domain=fracxional.com&sz=64",
		link: "https://fracxional.com/",
		roles: [
			{
				position: "Founder & Technical Consultant",
				description: [
					"Teaching AI, data engineering, and automation courses across universities and corporate programs in Asia.",
					"Course design and delivery spanning prompt engineering, AI agents, data pipelines, and applied ML.",
				],
				technologies: [],
				clients: [
					{
						name: "NTU PaCE",
						link: "https://www.ntu.edu.sg/pace",
						logo: "https://www.google.com/s2/favicons?domain=ntu.edu.sg&sz=64",
					},
					{
						name: "SIT (via StagMatch)",
						link: "https://smet.edu.sg/",
						logo: "https://www.google.com/s2/favicons?domain=smet.edu.sg&sz=64",
					},
					{
						name: "SMU PGDP (via CuriousCore)",
						link: "https://curiouscore.com/",
						logo: "https://www.google.com/s2/favicons?domain=curiouscore.com&sz=64",
					},
					{
						name: "BCG RISE",
						link: "https://www.bcg.com/",
						logo: "https://www.google.com/s2/favicons?domain=bcg.com&sz=64",
					},
					{
						name: "JERA GM",
						link: "https://www.jera.co.jp/en/",
						logo: "https://www.google.com/s2/favicons?domain=jera.co.jp&sz=64",
					},
					{
						name: "SkillsUnion",
						link: "https://skillsunion.com/",
						logo: "https://www.google.com/s2/favicons?domain=skillsunion.com&sz=64",
					},
					{
						name: "Preface AI",
						link: "https://preface.ai/",
						logo: "https://www.google.com/s2/favicons?domain=preface.ai&sz=64",
					},
					{
						name: "BSD Education",
						link: "https://bsd.education/",
						logo: "https://www.google.com/s2/favicons?domain=bsd.education&sz=64",
					},
					{
						name: "Sarah@Capua",
						link: "https://sarah.capua.co/",
						logo: "https://www.google.com/s2/favicons?domain=sarah.capua.co&sz=64",
					},
				],
				href: null,
				hook: null,
			},
		],
	},
	{
		date: "2021 - 2022",
		company: "ZOLO",
		logo: "https://www.google.com/s2/favicons?domain=sayzolo.com&sz=64",
		link: "",
		roles: [
			{
				position: "Co-founder & CTO",
				description: [
					"AI-powered food supply chain startup. Raised ~$350K pre-seed from Antler, Gharage Ventures, Protege Ventures, and NTUitive.",
					"Led engineering, product architecture, and technical strategy. Piloted with Indoguna, FoodXervices and CS Tay, growing to ~USD 13k MRR within 3 months.",
					"Managed an offshore engineering team across Pakistan and India.",
				],
				technologies: ["nextjs", "openai"],
				href: null,
				hook: null,
			},
		],
	},
	{
		date: "2023",
		logo: "https://www.google.com/s2/favicons?domain=partior.com&sz=64",
		link: "https://www.partior.com/",
		company: "Partior",
		roles: [
			{
				position: "Senior DevSecOps Engineer",
				description: [
					"Built the DevSecOps and CI/CD platform for cross-border payments on Quorum blockchain.",
					"Maintained security testing cadence (SAST, DAST, SCA, pentests) and integrated compliance and security pipelines.",
				],
				technologies: [
					"kubernetes",
					"docker",
					"vault",
					"terraform",
					"ansible",
					"consul",
				],
				href: null,
				hook: null,
			},
		],
	},
	{
		date: "2022",
		logo: "https://www.google.com/s2/favicons?domain=circles.life&sz=64",
		link: "https://www.circles.life/",
		company: "Circles.Life",
		roles: [
			{
				position: "Senior Software Engineer",
				description: [
					"Managed a portfolio of three software products with a team of five engineers. Implemented formalized engineering practices.",
					"Built an in-house Customer Data Platform for real-time, hyper-personalized customer experiences through segmented omni-channel communication.",
					"Developed an API Sandbox for accelerated prototyping and RPC testing via Diameter Protocol with a partner telco.",
					"Created a Telco Demo Platform with module-federated Circles-X launch platform and role-based access control.",
				],
				technologies: [
					"golang",
					"airflow",
					"snowflake",
					"aws",
					"reactNative",
					"auth0",
					"pwa",
				],
				href: "https://circles-x.com/products",
				hook: "About Circles-X",
			},
			{
				position: "Software Engineer",
				description: [
					"Built a full-stack web application for Jetpac's Roaming ESim and Pokemon Campaign, focusing on frontend development and mobile integration.",
					"Led engineering efforts for a B2B2C E-commerce Platform for corporate telco plan management.",
					"Developed automation tools for CI workflow, testing, type coverage, and observability. Also worked on MLOps workflows for credit scoring and customer segmentation.",
				],
				technologies: [
					"react",
					"nextjs",
					"supabase",
					"awsAmplify",
					"express",
					"jest",
					"cypress",
					"storybook",
					"snowflake",
					"airflow",
					"kubernetes",
					"docker",
				],
				href: "https://labs.circleslife.co/",
				hook: "About Labs",
			},
		],
	},
	{
		date: "2021",
		logo: "https://www.google.com/s2/favicons?domain=rocketacademy.co&sz=64",
		link: "https://www.rocketacademy.co/",
		company: "Rocket Academy",
		roles: [
			{
				position: "Software Engineering Instructor",
				description: [
					"Taught programmatic thinking, data structures, and algorithms to 100+ students at Singapore's premier software engineering bootcamp.",
				],
				technologies: ["mongodb", "express", "react", "nodejs", "typescript"],
				href: "https://www.rocketacademy.co/courses/coding-course",
				hook: "Learn more",
			},
		],
	},
	{
		date: "2016 - 2021",
		logo: "https://www.google.com/s2/favicons?domain=mindef.gov.sg&sz=64",
		link: "https://www.mindef.gov.sg/oms/arc/",
		company: "Singapore Armed Forces",
		roles: [
			{
				position: "Military Officer",
				description: [
					"A decade of service. Led teams, managed operations, and built resilience. Also blew things up and cleaned up the mess.",
				],
				technologies: ["tank"],
				href: null,
				hook: null,
			},
		],
	},
];

export default timeline;
