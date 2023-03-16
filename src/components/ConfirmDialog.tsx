import { useState } from "react";

interface ConfirmDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  message,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const [visible, setVisible] = useState(true);

  function handleConfirm() {
    onConfirm();
    setVisible(false);
  }

  function handleCancel() {
    onCancel();
    setVisible(false);
  }

  return (
    <div className="dialog" style={{ display: visible ? "block" : "none" }}>
      <div className="dialog-content">
        <p>{message}</p>
        <button onClick={handleConfirm}>Yes</button>
        <button onClick={handleCancel}>No</button>
      </div>
    </div>
  );
}
