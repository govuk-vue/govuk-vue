// Based on https://gist.github.com/rhysburnie/a255e7246d919872029b17d4b2b26419
import { useSlots } from 'vue'

export default function useHasSlot(name: string) {
  const slots = useSlots()
  // @ts-ignore
  return slots && slots[name] && !isEmptySlot(slots[name]())
}

function isEmptySlot(items: any[]) {
  if (!items.length) return true
  return !items.some(hasSlotContent)
}

function hasSlotContent(item: any) {
  const type = item.type.toString()
  if (type === 'Symbol(Comment)') return false
  if (type === 'Symbol(v-cmt)') return false
  if (type === 'Symbol(Text)' && !item.children.trim()) return false
  if (type === 'Symbol(v-txt)' && !item.children.trim()) return false
  if (type === 'Symbol(Fragment)' && !item.children.length) return false
  if (type === 'Symbol(v-fgt)' && !item.children.length) return false
  return true
}
