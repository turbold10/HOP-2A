"use client";

import { useState } from "react";

const mockData = [
  {
    id: 1,
    label: "HTML",
    content:
      "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.",
    children: [
      {
        id: 11,
        label: "HTML5 Features",
        content:
          "Semantic elements, canvas, local storage, and more modern web APIs.",
      },
      {
        id: 12,
        label: "Accessibility",
        content:
          "ARIA attributes, semantic markup, and screen reader compatibility.",
      },
    ],
  },
  {
    id: 2,
    label: "CSS",
    content:
      "Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.",
    // No children - this item has no nested accordion
  },
  {
    id: 3,
    label: "JavaScript",
    content:
      "JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.",
    children: [
      {
        id: 31,
        label: "ES6+ Features",
        content:
          "Arrow functions, destructuring, modules, async/await, and more.",
      },
      {
        id: 32,
        label: "DOM Manipulation",
        content: "Methods for dynamically changing HTML content and structure.",
      },
      {
        id: 33,
        label: "Frameworks",
        content: "Popular JavaScript frameworks like React, Vue, and Angular.",
      },
    ],
  },
  {
    id: 4,
    label: "React",
    content:
      "A JavaScript library for building user interfaces, maintained by Facebook and the community.",
  },
];

export const Accordion = () => {
  const [selected, setSelected] = useState([]);

  const handler = (id) => {
    setSelected((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <div>
      {mockData.map((data) => {
        const isParentOpen = selected.includes(data.id);
        const hasChildren = data.children && data.children.length > 0;

        return (
          <div key={data.id}>
            {/* Parent Accordion Item */}
            <div
              onClick={() => handler(data.id)}
              style={{ cursor: "pointer", fontWeight: "bold" }}
            >
              <span>{data.label}</span>
              <span>{isParentOpen ? " ▼" : " ▶"}</span>
            </div>

            {/* Parent Content + Children */}
            {isParentOpen && (
              <div>
                {/* Parent Content */}
                <div style={{ paddingLeft: "20px" }}>{data.content}</div>

                {/* Children Accordions (if any) */}
                {hasChildren && (
                  <div>
                    {data.children.map((child) => {
                      const isChildOpen = selected.includes(child.id);
                      return (
                        <div key={child.id}>
                          {/* Child Header */}
                          <div
                            onClick={() => handler(child.id)}
                            style={{ cursor: "pointer", paddingLeft: "40px" }}
                          >
                            <span>{child.label}</span>
                            <span>{isChildOpen ? " ▼" : " ▶"}</span>
                          </div>

                          {/* Child Content */}
                          {isChildOpen && (
                            <div style={{ paddingLeft: "60px" }}>
                              {child.content}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
