import type { Document } from "@/app/types";

interface Props {
  documents: Document[];
  selectedDocument: Document | null;
  onSelectDocument: (doc: Document) => void;
  onClearFilters: () => void;
}

export function DocumentList({
  documents,
  selectedDocument,
  onSelectDocument,
  onClearFilters,
}: Props) {
  if (documents.length === 0) {
    return (
      <div className="p-6 text-slate-500">
        No documents found.
        <button
          onClick={onClearFilters}
          className="block mt-4 text-emerald-600 underline"
        >
          Clear filters
        </button>
      </div>
    );
  }

  return (
    <div className="border-r bg-white overflow-y-auto">
      {documents.map((doc) => (
        <div
          key={doc.id}
          onClick={() => onSelectDocument(doc)}
          className={`p-4 cursor-pointer border-b hover:bg-slate-50 ${
            selectedDocument?.id === doc.id ? "bg-emerald-50" : ""
          }`}
        >
          <h3 className="font-semibold text-slate-900">{doc.title}</h3>
          <p className="text-sm text-slate-600">{doc.summary}</p>
          <p className="text-xs text-slate-400 mt-1">{doc.fileName}</p>
        </div>
      ))}
    </div>
  );
}
