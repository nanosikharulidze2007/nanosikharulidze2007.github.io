import React, { useState } from "react";
import "./SendToGmailForm.css";
import { useNavigate } from "react-router";
import { incrementLevel } from "./updateLevel";

const questions = [
  {
    text: "1) რატომ აირჩიეთ წყალქვეშა მსვერკაობის განხრა?",
    options: [
      "ნამდვილი ნიჭი წყალში არ იკარგება",
      'იმიტომ რომ "ისედაც სულ ჯანზევარ"',
      "მალე ვთვრები",
      "ყველა პასუხი სწორია",
    ],
    correct: "ყველა პასუხი სწორია",
  },
  {
    text: "2) რა ჭირდება მსგავსი პროფესიის კვალიფიკაციას მოსამზადებლად?",
    options: [
      "ბევრი პროტეინის ჭამა (ჯანზე როიყო)",
      "საყვარელი ლეკვების რილსების ყურება (დოპამინის ბუსტი)",
      "პარკში სიარული (ფიზ. გამძლეობა + სუფტა ჰაერი კაია)",
      "ახალი ადამიანების გაცნობა (სვიაზების თემაში)(ყველასი არა სჯობს 1 და სანდო)",
      "ყველა პასუხი სწორია",
    ],
    correct: "ყველა პასუხი სწორია",
  },
  {
    text: "3) აირჩიეთ ყველაზე ბოროტი ადამიანი",
    options: [
      "გული ბარკალაია",
      "ჰიტლერი",
      "ტანოსი",
      "ღამის მეფე (სამეფო კარის თამაშები)",
    ],
    correct: "გული ბარკალაია",
  },
];

const SendToGmailForm: React.FC<{ level: string }> = ({ level }) => {
  const [answers, setAnswers] = useState<(string | null)[]>(
    Array(questions.length).fill(null)
  );
  const [submitted, setSubmitted] = useState(false);
  const [wrong, setWrong] = useState<number[]>([]);
  const navigate = useNavigate();

  const handleSelect = (qIndex: number, option: string) => {
    if (submitted) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[qIndex] = option;
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const wrongIndexes = questions
      .map((q, i) => (answers[i] !== q.correct ? i : -1))
      .filter((i) => i !== -1);

    if (wrongIndexes.length > 0) {
      setWrong(wrongIndexes);
      setSubmitted(true);
      return;
    }

    await incrementLevel();
    navigate(`/next/${Number(level) + 1}`);
  };

  const handleRetry = () => {
    setSubmitted(false);
    setWrong([]);
    setAnswers(Array(questions.length).fill(null));
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit} className="form" noValidate>
        {questions.map((q, qi) => (
          <div key={qi} className="field" style={{ gap: 10 }}>
            <span
              className="label"
              style={{ fontSize: 16, fontWeight: 600, color: "#111" }}
            >
              {q.text}
            </span>
            <div style={{ display: "grid", gap: 8 }}>
              {q.options.map((opt) => {
                const selected = answers[qi] === opt;
                const isWrong = submitted && wrong.includes(qi) && selected;
                return (
                  <label
                    key={opt}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 14px",
                      borderRadius: 10,
                      border: `1px solid ${
                        isWrong
                          ? "#dc2626"
                          : selected
                          ? "var(--hover)"
                          : "#d1d5db"
                      }`,
                      background: isWrong
                        ? "#fee2e2"
                        : selected
                        ? "#f3f4f6"
                        : "#fff",
                      cursor: submitted ? "default" : "pointer",
                      fontSize: 14,
                      color: selected ? "#df00ff" : "#111",
                    }}
                  >
                    <input
                      type="radio"
                      name={`q${qi}`}
                      value={opt}
                      checked={selected}
                      onChange={() => handleSelect(qi, opt)}
                      style={{ accentColor: "var(--hover)" }}
                    />
                    {opt}
                  </label>
                );
              })}
            </div>
            {submitted && wrong.includes(qi) && (
              <p className="msg error">არასწორი პასუხი, სცადე თავიდან!</p>
            )}
          </div>
        ))}

        {!submitted ? (
          <button
            className="btn"
            type="submit"
            disabled={answers.some((a) => a === null)}
          >
            გაგზავნა
          </button>
        ) : wrong.length > 0 ? (
          <button className="btn" type="button" onClick={handleRetry}>
            თავიდან ცდა
          </button>
        ) : null}
      </form>
    </div>
  );
};

export default SendToGmailForm;
