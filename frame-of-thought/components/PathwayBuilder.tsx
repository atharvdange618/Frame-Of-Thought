"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export interface PathwayItemDraft {
  clientId: string;
  movieId: string;
  title: string;
  year: number;
  note: string;
}

interface Props {
  items: PathwayItemDraft[];
  onReorder: (items: PathwayItemDraft[]) => void;
  onRemove: (clientId: string) => void;
  onNoteChange: (clientId: string, note: string) => void;
}

function SortableItem({
  item,
  index,
  onRemove,
  onNoteChange,
}: {
  item: PathwayItemDraft;
  index: number;
  onRemove: (clientId: string) => void;
  onNoteChange: (clientId: string, note: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.clientId });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="rounded-sm border border-stone-800 bg-stone-900/50 p-4"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <button
            type="button"
            className="mt-0.5 cursor-grab touch-none text-stone-600 hover:text-stone-400 active:cursor-grabbing"
            aria-label={`Drag to reorder ${item.title}`}
            {...attributes}
            {...listeners}
          >
            ⋮⋮
          </button>
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-amber-600/80">
              {index + 1}
            </span>
            <p className="font-medium text-stone-200">
              {item.title}{" "}
              <span className="text-stone-600">({item.year})</span>
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onRemove(item.clientId)}
          className="text-xs text-stone-600 transition-colors hover:text-red-400"
        >
          Remove
        </button>
      </div>
      <input
        type="text"
        value={item.note}
        onChange={(e) => onNoteChange(item.clientId, e.target.value)}
        placeholder="Why this film belongs in the pathway…"
        className="w-full rounded-sm border border-stone-700 bg-stone-900/60 px-3 py-2 text-sm text-stone-300 placeholder:text-stone-600 focus:border-amber-700/60 focus:outline-none"
      />
    </li>
  );
}

export function PathwayBuilder({
  items,
  onReorder,
  onRemove,
  onNoteChange,
}: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((i) => i.clientId === active.id);
    const newIndex = items.findIndex((i) => i.clientId === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = [...items];
    const [moved] = reordered.splice(oldIndex, 1);
    reordered.splice(newIndex, 0, moved);
    onReorder(reordered);
  };

  if (items.length === 0) {
    return (
      <p className="rounded-sm border border-dashed border-stone-800 px-4 py-8 text-center text-sm italic text-stone-600">
        Add films below, then drag to set the order.
      </p>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((i) => i.clientId)}
        strategy={verticalListSortingStrategy}
      >
        <ul className="flex flex-col gap-3">
          {items.map((item, index) => (
            <SortableItem
              key={item.clientId}
              item={item}
              index={index}
              onRemove={onRemove}
              onNoteChange={onNoteChange}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
