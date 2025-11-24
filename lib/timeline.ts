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
	logo: string; // favicon or small logo URL
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
		date: "Jun 24 - Present",
		company: "Iterative Capital",
		logo: "https://www.google.com/s2/favicons?domain=iterative.vc&sz=64",
		link: "https://iterative.vc/",
		roles: [
			{
				position: "Data & Automations Engineer",
				description: [
					"Lead the design & implementation of firm-wide data & automation infrastructure that powers investment, accelerator & portfolio operations. Build systems that unify sourcing, diligence, & decision-making through scalable data pipelines, AI-driven insights & seamless internal tools.",
					"Conduct technical due diligence on deep-tech & software startups, host technical panels, & advise portfolio CTOs on engineering & infrastructure strategy.",
					"Key projects include: Custom MCP Server (connected data sources for dynamic data retrieval & summarisation), Internal Network Graph (visualised founder & expert relationships to support scouting), Dynamic Founder Bible (parse founder-shared Slack knowledge into a searchable database).",
				],
				technologies: ["python", "nextjs", "supabase"],
				href: null,
				hook: null,
			},
		],
	},
	{
		date: "Part-time",
		company: "Fracxional",
		logo: "https://www.google.com/s2/favicons?domain=fracxional.com&sz=64",
		link: "https://fracxional.com/",
		roles: [
			{
				position: "Founder / Technical Consultant",
				description: [
					"Curriculum design and instruction for international clients:",
					"Institutions: NTU PaCE under SkillsUnion, SIT under StagMatch (Cloud / DevOps / Software), SMU PGDP under CuriousCore (Applied AI)",
					"Companies: Tamkeen under Localized / SkillsUnion (Data Science, AI/ML & Analytics)",
					"Others: Sarah@Capua under Rocket Academy (Software Engineering), BSD Academy, Preface AI (Robotics / Software, Applied AI)",
				],
				technologies: [],
				clients: [
					{
						name: "CuriousCore",
						link: "https://curiouscore.com/",
						logo: "https://www.google.com/s2/favicons?domain=curiouscore.com&sz=64",
					},
					{
						name: "SkillsUnion",
						link: "https://skillsunion.com/",
						logo: "https://www.google.com/s2/favicons?domain=skillsunion.com&sz=64",
					},
					{
						name: "Preface",
						link: "https://preface.ai/",
						logo: "https://www.google.com/s2/favicons?domain=preface.ai&sz=64",
					},
					{
						name: "BSD Education",
						link: "https://bsd.education/",
						logo: "https://www.google.com/s2/favicons?domain=bsd.education&sz=64",
					},
					{
						name: "Stag Match (SMET)",
						link: "https://smet.edu.sg/",
						logo: "https://www.google.com/s2/favicons?domain=smet.edu.sg&sz=64",
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
		date: "Apr 23 - Nov 23",
		company: "ZOLO",
		logo: "https://www.google.com/s2/favicons?domain=sayzolo.com&sz=64",
		link: "",
		roles: [
			{
				position: "Co-founder, ex-CTO",
				description: [
					"Architected an AI-driven platform for food suppliers to cut errors, time and waste from manual order processing.",
					"Piloted with Indoguna, FoodXervices and C.STAY, growing to ~USD 13k MRR within 3 months and pursuing expansion to Thailand and Dubai.",
					"Raised ~USD 350k pre-seed from Antler, Garage Ventures, Protege Ventures and NTUitive.",
					"Managed an offshore engineering team across Pakistan and India.",
					"Moved to a tech advisory role to focus on work in Partior.",
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
				position: "Snr DevSecOps Engineer",
				description: [
					"Partior is an open-industry, blockchain-powered exchange that enables banks to access real-time, cross-border, multi-currency payments, such as DVP and PVP, tokenized asset borrowing and lending, and support for CBDC initiatives.",
					"I implement the DevSecOps & CI/CD platform to provide cross-border payments through Quorum blockchain. I maintain a security testing cadence (SAST, DAST, SCA and pentests) and integrate compliance and security pipelines.",
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
				position: "Snr Software Engineer",
				description: [
					"Managed a portfolio of three software products and implemented formalized engineering practices. Led a team of five engineers and focused on their training and development.",
					"Fostered close collaboration between engineering, product, and design teams to ensure seamless coordination and efficient project execution.",
					"Implemented an in-house Customer Data Platform that facilitated real-time, hyper-personalized customer experiences through segmented omni-channel communication.",
					"Developed an API Sandbox, providing engineers with a testing environment for mock APIs. Included customizable responses and a proxy gateway for accelerated prototyping and RPC testing via Diameter Protocol with a partner telco.",
					"Created a Telco Demo Platform, featuring a module-federated Circles-X launch platform. Incorporated role-based access control to streamline onboarding for potential customers and pre-sales consultants, reducing the process from days to minutes.",
				],
				technologies: [
					"golang",
					"airflow",
					"snowflake",
					"aws",
					"reactNative",
					"auth0",
					"pwa",
					// "DDD",
					// "Diameter Protocol (Gx, Gy)",
				],
				href: "https://circles-x.com/products",
				hook: "About Circles-X",
			},
			{
				position: "Software Engineer",
				description: [
					"Circles.Life is a mobile virtual network operator disrupting the global telecommunications industry.",
					"Built a full-stack web application for Jetpac's Roaming ESim and Pokemon Campaign, focusing on frontend development and mobile integration.",
					"Led engineering efforts for a B2B2C E-commerce Platform, simplifying corporate telco plan management and handling multiple corporate accounts.",
					"Developed automation tools for improving CI workflow, testing, type coverage, and observability. Also worked on DevSecOps pipeline and MLOps workflows for credit scoring and customer segmentation models.",
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
					"Rocket Academy is the premier software engineering bootcamp in Singapore.",
					"After honing my chops at their bootcamp, I transferred my knowledge to over 100 students in areas of programmatic thinking, data structures and algorithms. Even a few students landed jobs after the six-week course!",
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
		company: "MINDEF / SAF",
		roles: [
			{
				position: "Military Officer",
				description: ["I blew things up and then had to clean up the mess."],
				technologies: ["tank"],
				href: null,
				hook: null,
			},
		],
	},
];

export default timeline;
