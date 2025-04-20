// Mock data for summaries grouped by date
export const summariesByDate = [
  {
    date: "2023-06-15",
    summaries: [
      {
        id: 1,
        title: "Morning Meeting",
        mode: "meeting",
        summary: "Discussed Q2 results and planning for Q3. Sales exceeded targets by 8%.",
        keyPoints: [
          "Q2 sales exceeded targets by 8%",
          "Marketing expenses were on budget",
          "New product launch scheduled for Q3"
        ],
        todoItems: [
          "Prepare Q3 marketing plan",
          "Schedule product launch meeting",
          "Review sales targets for Q3"
        ]
      },
      {
        id: 2,
        title: "Personal Notes",
        mode: "personal",
        summary: "Brainstormed ideas for the new project. Need to focus on user experience and performance.",
        keyPoints: [
          "User experience is a priority",
          "Performance optimization needed",
          "Consider mobile-first approach"
        ],
        todoItems: [
          "Create wireframes for new UI",
          "Research performance optimization techniques",
          "Schedule meeting with UX team"
        ]
      }
    ]
  },
  {
    date: "2023-06-14",
    summaries: [
      {
        id: 3,
        title: "Physics Lecture",
        mode: "classroom",
        summary: "Lecture on quantum mechanics and wave-particle duality. Covered Schrödinger's equation and its applications.",
        keyPoints: [
          "Wave-particle duality explains quantum behavior",
          "Schrödinger's equation describes quantum systems",
          "Quantum entanglement is a key concept"
        ],
        todoItems: [
          "Review lecture notes",
          "Complete homework problems",
          "Read chapter 7 in textbook"
        ]
      }
    ]
  },
  {
    date: "2023-06-12",
    summaries: [
      {
        id: 4,
        title: "Team Standup",
        mode: "meeting",
        summary: "Daily standup meeting. Discussed progress on current sprint tasks and blockers.",
        keyPoints: [
          "Frontend team completed user authentication",
          "Backend API integration in progress",
          "Database optimization needed"
        ],
        todoItems: [
          "Review pull requests",
          "Help with API integration",
          "Schedule database optimization meeting"
        ]
      },
      {
        id: 5,
        title: "Research Paper",
        mode: "pdf",
        summary: "Read research paper on AI applications in healthcare. Promising results for diagnostic assistance.",
        keyPoints: [
          "AI improves diagnostic accuracy by 15%",
          "Implementation challenges include data privacy",
          "Cost-benefit analysis shows positive ROI"
        ],
        todoItems: [
          "Summarize key findings",
          "Share with healthcare team",
          "Explore potential applications"
        ]
      }
    ]
  }
];

// Helper function to get a summary by ID
export const getSummaryById = (id) => {
  for (const dateGroup of summariesByDate) {
    for (const summary of dateGroup.summaries) {
      if (summary.id === id) {
        return { ...summary, date: dateGroup.date };
      }
    }
  }
  return null;
};

// Helper function to format date
export const formatDate = (dateString) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};