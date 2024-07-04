import React, { useState } from 'react'
import {
  DndContext,
  closestCenter,
  MouseSensor,
  useSensor,
  useSensors,
  UniqueIdentifier,
  DragOverlay,
  DropAnimation,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { createPortal } from 'react-dom'

type SortableContainerProps = {
  children: React.ReactNode
  items: {
    id: UniqueIdentifier
    [key: string]: any
  }[]

  onDragEnd: (oldIndex: number, newIndex: number) => void
}

const SortableContainer: React.FC<SortableContainerProps> = ({ children, items, onDragEnd }) => {
  const sensors = useSensors(useSensor(MouseSensor, { activationConstraint: { distance: 8 } }))
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)

  const dropAnimationConfig: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5',
        },
      },
    }),
  }

  function handleDragEnd(event: { active: any; over: any }) {
    const { active, over } = event
    setActiveId(null)
    if (active.id !== over.id) {
      const oldIndex = items.findIndex(item => item.id === active.id)
      const newIndex = items.findIndex(item => item.id === over.id)
      onDragEnd(oldIndex, newIndex)
    }
  }

  return (
    <DndContext
      autoScroll={false}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={({ active }) => {
        if (!active) {
          return
        }
        setActiveId(active.id)
      }}
      onDragCancel={() => setActiveId(null)}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  )
}

export default SortableContainer
