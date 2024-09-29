import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs'
interface Props {
  ItemProps: TypeItem[]
}
interface TypeItem {
  id: string
  name: string
  children: React.ReactNode
}
export default function TabsSet({ ItemProps }: Props) {
  return ItemProps.map((item: TypeItem) => (
    <Tabs defaultValue={item.id} key={item.id} className='w-[400px]'>
      <TabsList>
        <TabsTrigger value={item.id}>{item.name}</TabsTrigger>
      </TabsList>
      <TabsContent value={item.id}>{item.children}</TabsContent>
    </Tabs>
  ))
}
