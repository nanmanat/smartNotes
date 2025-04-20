import React, { useEffect, useState } from 'react';
import SummaryCard from '../components/SummaryCard';
import TodoItem from '../components/TodoItem';
import ActionButton from '../components/ActionButton';

function SummaryPage({ onPageChange, pageParams }) {
  const [summaryData, setSummaryData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch summary data
    setIsLoading(true);
    setAnimateIn(false);

    setTimeout(() => {
      // Different summaries based on mode
      if (pageParams.mode === "personal") {
        setSummaryData({
          title: "Personal Notes Summary",
          mode: "personal",
          summary: "This recording captured your personal thoughts about the upcoming project timeline. You expressed concerns about the tight deadline and suggested allocating more resources to the design phase.",
          keyPoints: [
            "Project timeline needs review",
            "Design phase requires more resources",
            "Budget constraints might affect quality"
          ],
          todoItems: [
            "Schedule meeting with design team",
            "Review project budget",
            "Create alternative timeline proposal"
          ]
        });
      } else if (pageParams.mode === "classroom") {
        setSummaryData({
          title: "Classroom Lecture Summary",
          mode: "classroom",
          summary: "This lecture covered the fundamentals of quantum physics, including wave-particle duality, quantum entanglement, and Heisenberg's uncertainty principle. The professor emphasized the importance of understanding these concepts for the upcoming exam.",
          keyPoints: [
            "Wave-particle duality explains light behavior",
            "Quantum entanglement allows particles to be connected",
            "Uncertainty principle: cannot know position and momentum with perfect accuracy"
          ],
          todoItems: [
            "Review textbook chapter 7",
            "Complete practice problems 1-15",
            "Watch supplementary video on quantum entanglement"
          ]
        });
      } else if (pageParams.mode === "meeting") {
        setSummaryData({
          title: "Team Meeting Summary",
          mode: "meeting",
          summary: "The meeting focused on Q3 results and planning for Q4. Sales exceeded targets by 12%, but marketing expenses were higher than budgeted. The team agreed to reallocate resources for Q4 to focus on digital marketing channels.",
          keyPoints: [
            "Q3 sales exceeded targets by 12%",
            "Marketing expenses were 8% over budget",
            "Digital channels outperformed traditional media"
          ],
          todoItems: [
            "Update Q4 marketing budget allocation",
            "Schedule follow-up with digital marketing team",
            "Prepare presentation for executive committee"
          ]
        });
      } else if (pageParams.mode === "pdf") {
        setSummaryData({
          title: "PDF Document Summary",
          mode: "pdf",
          summary: "This research paper explores the impact of artificial intelligence on healthcare outcomes. The authors conducted a meta-analysis of 42 studies and found significant improvements in diagnostic accuracy when AI systems were used as support tools for clinicians.",
          keyPoints: [
            "AI significantly improves diagnostic accuracy",
            "Best results achieved with human-AI collaboration",
            "Implementation barriers include training and infrastructure"
          ],
          todoItems: [
            "Review cited studies on diagnostic applications",
            "Note implementation recommendations",
            "Compare with previous research in this field"
          ]
        });
      }

      setIsLoading(false);
      setTimeout(() => setAnimateIn(true), 100);
    }, 1000);
  }, [pageParams.mode]);

  // Get color based on mode
  const getModeColor = (mode) => {
    switch(mode) {
      case 'personal': return 'violet';
      case 'classroom': return 'sky';
      case 'meeting': return 'rose';
      case 'pdf': return 'amber';
      default: return 'slate';
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-12 h-12 rounded-full border-4 border-slate-200 dark:border-slate-700 border-t-violet-500 animate-spin"></div>
          <p className="mt-4 text-slate-500 dark:text-slate-400">Processing your recording...</p>
        </div>
      </div>
    );
  }

  const modeColor = getModeColor(summaryData.mode);

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <div className={`transition-all duration-500 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <div className={`w-4 h-4 rounded-full bg-${modeColor}-400 dark:bg-${modeColor}-500 mr-3`}></div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{summaryData.title}</h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 ml-7">
            {summaryData.keyPoints.length} key points • {summaryData.todoItems.length} action items
          </p>
        </div>

        <div className={`transition-all duration-500 delay-100 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <SummaryCard title="Summary">
            <p className="text-slate-700 dark:text-slate-300">{summaryData.summary}</p>
          </SummaryCard>
        </div>

        <div className={`transition-all duration-500 delay-200 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <SummaryCard title="Key Points">
            <ul className="space-y-2 pl-5 text-slate-700 dark:text-slate-300">
              {summaryData.keyPoints.map((point, index) => (
                <li key={index} className="relative">
                  <span className="absolute -left-5 top-1.5 w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                  {point}
                </li>
              ))}
            </ul>
          </SummaryCard>
        </div>

        <div className={`transition-all duration-500 delay-300 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <SummaryCard title="Action Items">
            <div className="space-y-1">
              {summaryData.todoItems.map((item, index) => (
                <TodoItem key={index} text={item} />
              ))}
            </div>
          </SummaryCard>
        </div>

        {/* Add padding at the bottom to prevent content from being hidden behind fixed buttons */}
        <div className="pb-24"></div>
      </div>

      {/* Fixed buttons at the bottom of the screen */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 shadow-lg border-t border-slate-200 dark:border-slate-700 px-4 py-3 z-10">
        <div className="container mx-auto max-w-2xl">
          <div className="grid grid-cols-2 gap-4">
            <ActionButton 
              onClick={() => onPageChange("home")}
              color="slate"
              variant="outline"
              size="compact"
              className="w-full"
              alwaysHover={true}
            >
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7m-7-7v14"></path>
                </svg>
                Home
              </div>
            </ActionButton>

            <ActionButton 
              onClick={() => {/* Would handle export functionality */}}
              color={modeColor}
              size="compact"
              className="w-full"
              alwaysHover={true}
            >
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
                Export
              </div>
            </ActionButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryPage;
