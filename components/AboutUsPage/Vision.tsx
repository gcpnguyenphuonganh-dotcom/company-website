"use client";

import { useTranslation } from "react-i18next";

const fontGothic = "'Be Vietnam Pro' , sans-serif";
const fontMincho = "'Source Han Serif', '源ノ明朝', '思源宋体', serif";

export default function TitleTabsSection() {
  const { t } = useTranslation("common");

  const DATA = [
    {
      id: "mission",
      heading: t("tabs.mission.title"),
      content: t("tabs.mission.content"),
      footnote: t("tabs.mission.footnote"),
      date: t("tabs.mission.date"),
      bg: "white",
      indent: false,
      align: "left",
      type: "text",
    },
    {
      id: "vision",
      heading: t("tabs.vision.title"),
      content: t("tabs.vision.content"),
      date: t("tabs.vision.date"),
      bg: "gray",
      indent: false,
      align: "left",
      type: "text",
    },
    {
      id: "policies",
      heading: t("tabs.policies.title"),
      content: t("tabs.policies.content"),
      date: t("tabs.policies.date"),
      bg: "white",
      indent: true,
      align: "left",
      type: "ordered",
    },
    {
      id: "slogan",
      heading: t("tabs.slogan.title"),
      content: t("tabs.slogan.content"),
      subtitle: t("tabs.slogan.subtitle"),
      date: t("tabs.slogan.date"),
      bg: "gray",
      indent: false,
      align: "center",
      type: "text",
    },
    {
      id: "quality",
      heading: t("tabs.quality.title"),
      content: t("tabs.quality.content"),
      date: t("tabs.quality.date"),
      bg: "white",
      indent: true,
      align: "left",
      type: "text",
    },
    {
      id: "manufacturing",
      heading: t("tabs.manufacturing.title"),
      content: t("tabs.manufacturing.content"),
      date: t("tabs.manufacturing.date"),
      bg: "gray",
      indent: true,
      align: "center",
      type: "text",
    },
    {
      id: "humanrights",
      heading: t("tabs.humanrights.title"),
      content: t("tabs.humanrights.content"),
      date: t("tabs.humanrights.date"),
      bg: "white",
      indent: true,
      align: "left",
      type: "paragraphs",
    },
  ] as const;

  return (
    <section>
      {/* ── Section header ── */}
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "5px clamp(1rem,6vw,6rem)",
        }}
      >
        <h2
          className="
            text-[2rem]
            sm:text-[2.5rem]
            lg:text-4xl
            font-black
            text-[#020C1a]
            pt-16
            sm:pt-20
            lg:pt-24
            leading-tight
          "
        >
          {t("about.vision.title")}
        </h2>
      </div>

      {/* ── Philosophy blocks ── */}
      {DATA.map((item) => (
        <div
          key={item.id}
          className={`
            px-5
            sm:px-8
            lg:px-[clamp(1rem,6vw,6rem)]
            py-10
            sm:py-14
            lg:py-16
            ${item.bg === "gray" ? "bg-[#f4f6f7]" : "bg-white"}
          `}
        >
          <div className="max-w-5xl mx-auto w-full">

            {/* Accent line */}
            <div className="relative mb-5 sm:mb-6">
              <div className="absolute top-0 left-0 w-14 sm:w-16 h-[1px] bg-[#1a3a6b]" />
              <div className="w-full h-[1px] bg-gray-200" />
            </div>

            {/* Heading */}
            <h3
              className="font-bold mb-6 sm:mb-8 lg:mb-10 leading-tight"
              style={{
                letterSpacing: "0.13em",
                fontFamily: fontGothic,
                fontSize: "clamp(1.25rem, 3vw, 2rem)",
                color: "#020c1a",

              }}
            >
              {item.heading}
            </h3>

            {/* Content */}
            <div className={item.align === "center" ? "text-center" : ""}>

              {/* Paragraph blocks */}
              {item.type === "paragraphs" ? (
                <div className="space-y-6 sm:space-y-8">
                  {(item.content as string)
                    .split("\n\n")
                    .filter(Boolean)
                    .map((para, j) => (
                      <p
                        key={j}
                        style={{
                          fontSize: item.id === "humanrights"
                            ? "clamp(1rem, 2.5vw, 2rem)"   // max ~32px
                            : "clamp(1.2rem, 3.5vw, 2.625rem)",
                          lineHeight: "1.9",
                          letterSpacing: "0.04em",
                          textIndent: "clamp(1rem, 3vw, 2rem)",
                          fontFamily: fontMincho,
                          color: "#020c1a",
                        }}
                      >
                        {para.trim()}
                      </p>
                    ))}
                </div>

              ) : item.type === "ordered" ? (
                <div
                  className="flex justify-center"
                >
                  <ol
                    className="space-y-5 sm:space-y-6"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "baseline",
                      alignSelf: "center",
                      fontFamily: fontMincho,
                      color: "#020c1a",
                    }}>
                    {(item.content as string)
                      .split("\n")
                      .filter(Boolean)
                      .map((line, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 sm:gap-3"
                          style={{
                            paddingLeft: item.indent ? "clamp(0.5rem,2vw,2rem)" : "0",
                          }}
                        >
                          <span
                            className="text-[#013478] font-normal shrink-0 pt-5"
                            style={{
                              fontVariantNumeric: "oldstyle-nums",
                              fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
                              fontFamily: fontMincho,
                            }}
                          >
                            {j + 1}.
                          </span>
                          <span
                            style={{
                              fontSize: "clamp(1.2rem, 3.5vw, 2.625rem)",
                              lineHeight: "1.7",
                              letterSpacing: "0.04em",
                              fontFamily: fontMincho,
                              color: "#020c1a",
                            }}
                          >
                            {line.replace(/^\d+\.\s*/, "")}
                          </span>
                        </li>
                      ))}
                  </ol>
                </div>
                /* Ordered list */
              ) : (
                /* Regular text */
                <div
                  style={{
                    paddingLeft: item.indent ? "clamp(0.5rem,4.5vw,4.5rem)" : "0",
                  }}
                >
                  <p
                    className={item.align === "center" ? "inline-block text-left" : ""}
                    style={{
                      lineHeight: "1.625",
                      letterSpacing: "0.04em",
                      fontFamily: fontMincho,
                      color: "#020c1a",
                      whiteSpace: "pre-line",
                      fontWeight: item.id === "mission" ? 500 : undefined,
                      fontSize: item.id === "mission" ? "2.25rem" : "clamp(1.2rem, 3.5vw, 2.625rem)",
                    }}
                  >
                    {item.content}
                  </p>
                </div>
              )}
              {/* Subtitle */}
              {"subtitle" in item && item.subtitle && (
                <p
                  className="mt-4"
                  style={{
                    fontSize: "clamp(1rem, 2.5vw, 1.75rem)",
                    letterSpacing: "0.06em",
                    fontFamily: fontMincho,
                    color: "#013478",
                  }}
                >
                  {item.subtitle}
                </p>
              )}
              {/* Footnote */}
              {"footnote" in item && item.footnote && (
                <p
                  className="mt-8 sm:mt-10"
                  style={{
                    fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
                    lineHeight: "1.8",
                    letterSpacing: "0.02em",
                    whiteSpace: "pre-line",
                    fontFamily: fontMincho,
                    color: "#0069ad",
                  }}
                >
                  {item.footnote}
                </p>
              )}
            </div>
            {/* Footer */}
            <div
              className="
                flex
                flex-col
                sm:flex-row
                justify-end
                items-end
                gap-3
                sm:gap-4
                mt-10
                sm:mt-14
              "
              style={{ fontWeight: 500 }}
            >
              <p
                className="text-gray-500 leading-relaxed text-left"
                style={{
                  fontFamily: fontGothic,
                  fontSize: "14px",
                }}
              >
                {t("tabs.established")} {item.date}
                <br />
                {t("tabs.by_president")}
              </p>
              <img
                src="/AboutUs/Vision/chuthuphap.png"
                alt="YuuRi Ono signature"
                className="h-10 sm:h-12 w-auto object-contain"
                style={{ filter: "grayscale(30%)" }}
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}