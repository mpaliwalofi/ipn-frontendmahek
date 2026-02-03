import type { Document } from "@/app/types";

interface Props {
  document: Document | null;
}

export function DocumentViewer({ document }: Props) {
  if (!document) {
    return (
      <div className="p-8 text-slate-500">
        Select a document to preview its content.
      </div>
    );
  }

  return (
    <div className="p-8 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-2">{document.title}</h2>
      <p className="text-slate-500 mb-4">{document.fileName}</p>

      <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg text-sm overflow-x-auto">
        {document.content}
      </pre>
    </div>
  );
}
