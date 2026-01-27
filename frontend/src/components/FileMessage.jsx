import { FileText, Download } from "lucide-react";

const FileMessage = ({ file }) => {
  return (
    <a
      href={file.url}
      target="_blank"
      className="flex items-center gap-3 p-3 rounded-lg bg-base-200 hover:bg-base-300"
    >
      <FileText className="size-6 text-primary" />
      <div className="flex-1">
        <p className="text-sm font-medium truncate">{file.name}</p>
        <p className="text-xs text-base-content/60">
          {(file.size / 1024).toFixed(1)} KB
        </p>
      </div>
      <Download className="size-4" />
    </a>
  );
};

export default FileMessage;
