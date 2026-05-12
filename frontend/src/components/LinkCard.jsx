import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function LinkCard({
  link,
  onEdit,
  onDelete,
}) {
  const [showMenu, setShowMenu] =
    useState(false);

  const [copied, setCopied] =
    useState(false);

  const [showQR, setShowQR] =
    useState(false);

  const [showNotes, setShowNotes] =
    useState(false);

  // QR VALUE
  const qrValue =
    link.url?.trim() ||
    link.description ||
    "No Data Available";

  // COPY
  const handleCopy = () => {
    navigator.clipboard.writeText(
      qrValue
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  // DELETE
  const handleDelete = () => {
    if (
      window.confirm(
        "Are you sure you want to delete this item?"
      )
    ) {
      onDelete(link._id);
    }
  };

  // DOMAIN
  const getDomain = (url) => {
    if (!url) return "Notes";

    try {
      return new URL(url)
        .hostname;
    } catch {
      return url;
    }
  };

  return (
    <div
      className="bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden relative h-full flex flex-col"
      style={{
        borderTop: `5px solid ${link.color}`,
      }}
    >
      {/* BODY */}
      <div className="p-6 flex flex-col flex-1">
        {/* HEADER */}
        <div className="flex justify-between items-start gap-3">
          {/* TITLE */}
          <h3 className="text-xl font-bold text-gray-900 break-words line-clamp-2 flex-1">
            {link.title}
          </h3>

          {/* MENU */}
          <div className="relative shrink-0">
            <button
              onClick={() =>
                setShowMenu(
                  !showMenu
                )
              }
              className="p-2 rounded-xl hover:bg-gray-100 transition"
            >
              <svg
                className="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </button>

            {/* DROPDOWN */}
            {showMenu && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-2xl border border-gray-200 z-30 overflow-hidden">
                {/* EDIT */}
                <button
                  onClick={() => {
                    onEdit(link);

                    setShowMenu(
                      false
                    );
                  }}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-green-700 hover:bg-green-50 transition font-semibold"
                >
                  Edit
                </button>

                {/* DELETE */}
                <button
                  onClick={() => {
                    handleDelete();

                    setShowMenu(
                      false
                    );
                  }}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition font-semibold"
                >
                  Delete
                </button>

                {/* QR */}
                <button
                  onClick={() => {
                    setShowQR(
                      !showQR
                    );

                    setShowMenu(
                      false
                    );
                  }}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-blue-600 hover:bg-gray-100 transition font-semibold"
                >
                  {showQR
                    ? "Hide QR"
                    : "Show QR"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* DOMAIN */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm text-gray-500 truncate">
            {getDomain(
              link.url
            )}
          </span>

          {/* COPY */}
          <button
            onClick={handleCopy}
            className="ml-auto shrink-0 p-2 rounded-xl hover:bg-gray-100 transition"
          >
            {copied ? (
              <span className="text-green-600 text-sm font-semibold">
                Copied
              </span>
            ) : (
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            )}
          </button>
        </div>

        {/* NOTES */}
        {!link.url &&
          link.description && (
            <div className="mt-5">
              <button
                onClick={() =>
                  setShowNotes(
                    !showNotes
                  )
                }
                className="w-full flex items-center justify-between px-4 py-4 rounded-2xl bg-blue-50 border border-blue-100 hover:bg-blue-100 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
                    📝
                  </div>

                  <div className="text-left">
                    <p className="font-semibold text-blue-900">
                      Click to View
                      Notes
                    </p>

                    <p className="text-sm text-blue-600">
                      Expand note
                      content
                    </p>
                  </div>
                </div>

                <div
                  className={`transition-transform duration-300 ${
                    showNotes
                      ? "rotate-180"
                      : ""
                  }`}
                >
                  ▼
                </div>
              </button>

              {/* EXPANDED */}
              {showNotes && (
                <div className="mt-3 rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  <div className="max-h-[300px] overflow-y-auto">
                    <p className="text-gray-700 whitespace-pre-wrap leading-7">
                      {
                        link.description
                      }
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

        {/* CATEGORY */}
        <div className="mt-5">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold capitalize">
            {link.category}
          </span>
        </div>

        {/* TAGS */}
        {link.tags?.length >
          0 && (
          <div className="flex flex-wrap gap-2 mt-5">
            {link.tags
              .slice(0, 4)
              .map(
                (
                  tag,
                  idx
                ) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl bg-gray-100 text-gray-700 text-xs font-medium"
                  >
                    #{tag}
                  </span>
                )
              )}
          </div>
        )}

        {/* QR */}
        {showQR && (
          <div className="mt-6 border-t border-gray-200 pt-5">
            <div className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-3xl border shadow-sm">
                <QRCodeCanvas
                  value={qrValue}
                  size={140}
                  includeMargin
                />
              </div>

              <p className="text-xs text-gray-500 mt-3 text-center">
                Scan QR to open
                link or notes
              </p>
            </div>
          </div>
        )}

        {/* LINK BUTTON */}
        {link.url && (
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold py-3.5 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-lg"
          >
            Visit Link →
          </a>
        )}
      </div>
    </div>
  );
}