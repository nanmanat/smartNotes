import React, { useEffect, useState } from 'react';
import SummaryCard from '../components/SummaryCard';
import TodoItem from '../components/TodoItem';
import ActionButton from '../components/ActionButton';

function SummaryPage({ onPageChange, pageParams }) {
  const [summaryData, setSummaryData] = useState(null);
  
  useEffect(() => {
    // Simulate API call to fetch summary data
    setTimeout(() => {
      // Different summaries based on mode
      if (pageParams.mode === "personal") {
        setSummaryData({
          title: "Personal Notes Summary",
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
    }, 1500);
  }, [pageParams.mode]);

  if (!summaryData) {
    return (
      <div className="container mx-auto p-4 max-w-md">
        <h2 className="text-2xl font-bold text-center my-6">Processing...</h2>
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-2xl font-bold text-center my-6">{summaryData.title}</h2>
      
      <SummaryCard title="Summary">
        <p className="text-gray-700">{summaryData.summary}</p>
      </SummaryCard>
      
      <SummaryCard title="Key Points">
        <ul className="list-disc pl-5 text-gray-700">
          {summaryData.keyPoints.map((point, index) => (
            <li key={index} className="mb-1">{point}</li>
          ))}
        </ul>
      </SummaryCard>
      
      <SummaryCard title="Action Items">
        <div className="divide-y">
          {summaryData.todoItems.map((item, index) => (
            <TodoItem key={index} text={item} />
          ))}
        </div>
      </SummaryCard>
      
      <div className="grid grid-cols-2 gap-4 mt-6">
        <ActionButton 
          onClick={() => onPageChange("home")}
          color="gray"
        >
          Home
        </ActionButton>
        
        <ActionButton 
          onClick={() => {/* Would handle export functionality */}}
          color="blue"
        >
          Export
        </ActionButton>
      </div>
    </div>
  );
}

export default SummaryPage;