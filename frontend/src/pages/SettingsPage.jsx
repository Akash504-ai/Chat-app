import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { ArrowLeft, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-100 pt-20 px-4">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="btn btn-ghost btn-sm gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <div>
            <h1 className="text-xl font-semibold">Settings</h1>
            <p className="text-sm text-base-content/60">
              Customize your chat experience
            </p>
          </div>
        </div>

        {/* Theme Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Theme</h2>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {THEMES.map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`rounded-lg border p-2 transition
                  ${theme === t
                    ? "border-primary bg-primary/10"
                    : "border-base-300 hover:bg-base-200"}
                `}
              >
                <div
                  className="h-8 w-full rounded-md overflow-hidden mb-1"
                  data-theme={t}
                >
                  <div className="grid grid-cols-4 gap-px p-1 h-full">
                    <div className="bg-primary rounded"></div>
                    <div className="bg-secondary rounded"></div>
                    <div className="bg-accent rounded"></div>
                    <div className="bg-neutral rounded"></div>
                  </div>
                </div>

                <p className="text-[11px] font-medium text-center truncate">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Preview Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Preview</h2>

          <div className="rounded-xl border border-base-300 bg-base-200 p-4">
            <div className="mx-auto max-w-md">
              <div className="rounded-xl overflow-hidden bg-base-100 shadow">
                {/* Header */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-base-300">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-content flex items-center justify-center font-medium">
                    J
                  </div>
                  <div>
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-base-content/60">Online</p>
                  </div>
                </div>

                {/* Messages */}
                <div className="p-4 space-y-3 bg-base-100 min-h-[180px]">
                  {PREVIEW_MESSAGES.map((m) => (
                    <div
                      key={m.id}
                      className={`flex ${m.isSent ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`rounded-xl px-3 py-2 max-w-[75%] text-sm
                          ${m.isSent
                            ? "bg-primary text-primary-content"
                            : "bg-base-200"}
                        `}
                      >
                        {m.content}
                        <div className="text-[10px] mt-1 opacity-70">
                          12:00 PM
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="border-t border-base-300 p-3 flex gap-2">
                  <input
                    className="input input-bordered flex-1 h-10 text-sm"
                    value="This is a preview"
                    readOnly
                  />
                  <button className="btn btn-primary h-10 min-h-0">
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SettingsPage;
