## Description
Implement Edit and Delete functionality for links with confirmation dialogs.

## Acceptance Criteria
- [ ] Edit modal pre-populated with link data
- [ ] Update link with validation
- [ ] Delete confirmation dialog
- [ ] Optimistic UI updates
- [ ] Error handling with rollback

## Implementation Steps

### 1. Create EditLinkModal component
Create `src/components/links/EditLinkModal/EditLinkModal.tsx`:
```typescript
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Edit } from "lucide-react";
import { linkSchema, type LinkFormData } from "../../../utils/validation";
import { Button } from "../../common/Button";
import { Input } from "../../common/Input";
import { Textarea } from "../../common/Textarea";
import { TagInput } from "../../tags/TagInput";
import type { Link } from "../../../types/link";
import styles from "./EditLinkModal.module.css";

interface EditLinkModalProps {
  link: Link | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (id: string, data: Partial<LinkFormData>) => Promise<void>;
  existingTags: string[];
}

export function EditLinkModal({
  link,
  isOpen,
  onClose,
  onSubmit,
  existingTags,
}: EditLinkModalProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LinkFormData>({
    resolver: zodResolver(linkSchema),
  });

  useEffect(() => {
    if (link && isOpen) {
      reset({
        url: link.url,
        title: link.title,
        description: link.description || "",
        tags: link.tags || [],
        notes: link.notes || "",
      });
    }
  }, [link, isOpen, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleFormSubmit = async (data: LinkFormData) => {
    if (link) {
      await onSubmit(link.id, data);
      handleClose();
    }
  };

  if (!isOpen || !link) return null;

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>
          <h2><Edit size={20} /> Edit Link</h2>
          <button className={styles.closeBtn} onClick={handleClose}>
            <X size={20} />
          </button>
        </header>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className={styles.body}>
            <div className={styles.field}>
              <label>URL</label>
              <Input {...register("url")} disabled className={styles.disabled} />
            </div>

            <div className={styles.field}>
              <label>Title *</label>
              <Input {...register("title")} error={errors.title?.message} />
            </div>

            <div className={styles.field}>
              <label>Description</label>
              <Textarea {...register("description")} rows={2} />
            </div>

            <div className={styles.field}>
              <label>Tags</label>
              <TagInput
                value={watch("tags") || []}
                onChange={(tags) => setValue("tags", tags)}
                suggestions={existingTags}
              />
            </div>

            <div className={styles.field}>
              <label>Notes</label>
              <Textarea {...register("notes")} rows={3} />
            </div>
          </div>

          <footer className={styles.footer}>
            <Button variant="ghost" type="button" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" loading={isSubmitting}>
              Save Changes
            </Button>
          </footer>
        </form>
      </div>
    </div>
  );
}
```

### 2. Create ConfirmDialog component
Create `src/components/common/ConfirmDialog/ConfirmDialog.tsx`:
```typescript
import { AlertTriangle } from "lucide-react";
import { Button } from "../Button";
import styles from "./ConfirmDialog.module.css";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  onConfirm,
  onCancel,
  isLoading = false,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={`${styles.icon} ${styles[variant]}`}>
          <AlertTriangle size={24} />
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          <Button variant="ghost" onClick={onCancel} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button
            variant={variant === "danger" ? "danger" : "primary"}
            onClick={onConfirm}
            loading={isLoading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
```

### 3. Create ConfirmDialog styles
Create `src/components/common/ConfirmDialog/ConfirmDialog.module.css`:
```css
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: var(--space-4);
}

.dialog {
  background: var(--color-bg-primary);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  max-width: 400px;
  text-align: center;
  animation: scaleIn 0.2s ease-out;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--space-4);
}

.icon.danger {
  background: rgba(239, 68, 68, 0.1);
  color: var(--color-error);
}

.icon.warning {
  background: rgba(245, 158, 11, 0.1);
  color: var(--color-warning);
}

.title {
  margin: 0 0 var(--space-2);
  font-size: var(--text-lg);
}

.message {
  margin: 0 0 var(--space-6);
  color: var(--color-text-secondary);
}

.actions {
  display: flex;
  gap: var(--space-3);
  justify-content: center;
}
```

### 4. Usage in Dashboard
```typescript
const [editingLink, setEditingLink] = useState<Link | null>(null);
const [deletingLink, setDeletingLink] = useState<Link | null>(null);

const handleEdit = async (id: string, data: Partial<LinkFormData>) => {
  await updateLink({ id, ...data });
};

const handleDelete = async () => {
  if (deletingLink) {
    await deleteLink(deletingLink.id);
    setDeletingLink(null);
  }
};

// In JSX:
<EditLinkModal
  link={editingLink}
  isOpen={!!editingLink}
  onClose={() => setEditingLink(null)}
  onSubmit={handleEdit}
  existingTags={allTags}
/>

<ConfirmDialog
  isOpen={!!deletingLink}
  title="Delete Link"
  message={`Are you sure you want to delete "${deletingLink?.title}"?`}
  confirmText="Delete"
  variant="danger"
  onConfirm={handleDelete}
  onCancel={() => setDeletingLink(null)}
/>
```

## Estimated Effort
3 hours

## Dependencies
- #11 Implement Add Link Modal

