import React, { useState } from 'react';

function AIForm() {
  const [goals, setGoals] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [brandGuidelines, setBrandGuidelines] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        const response = await fetch('http://127.0.0.1:5000/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

      const data = await response.json();
      setAiResponse(data.content);
    } catch (error) {
      console.error('Error fetching AI response:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="AIForm">
      <form onSubmit={handleSubmit}>
        <textarea
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
          placeholder="Enter goals here..."
          rows="3"
          required
        />
        <textarea
          value={targetAudience}
          onChange={(e) => setTargetAudience(e.target.value)}
          placeholder="Enter target audience here..."
          rows="3"
          required
        />
        <textarea
          value={brandGuidelines}
          onChange={(e) => setBrandGuidelines(e.target.value)}
          placeholder="Enter brand guidelines here..."
          rows="3"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </form>
      {aiResponse && (
        <div className="response">
          <h2>AI Response</h2>
          <p>{aiResponse}</p>
        </div>
      )}
    </div>
  );
}

export default AIForm;
