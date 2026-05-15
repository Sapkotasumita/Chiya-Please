"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Plus, Pencil, Trash2, Coffee, UtensilsCrossed, Cookie } from "lucide-react"
import type { MenuItem } from "@/lib/types/database"

const categories = [
  { value: "chiya", label: "Chiya", icon: Coffee },
  { value: "coffee", label: "Coffee", icon: Coffee },
  { value: "snacks", label: "Snacks", icon: Cookie },
]

export default function MenuDashboardPage() {
  const [items, setItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [saving, setSaving] = useState(false)
  const [filter, setFilter] = useState<string>("all")
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "chiya" as "chiya" | "coffee" | "snacks",
    is_available: true,
    is_featured: false,
  })

  const supabase = createClient()

  const fetchItems = async () => {
    setLoading(true)
    let query = supabase.from("menu_items").select("*").order("category").order("name")
    
    if (filter !== "all") {
      query = query.eq("category", filter)
    }
    
    const { data, error } = await query
    if (!error && data) {
      setItems(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchItems()
  }, [filter])

  const openAddDialog = () => {
    setEditingItem(null)
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "chiya",
      is_available: true,
      is_featured: false,
    })
    setDialogOpen(true)
  }

  const openEditDialog = (item: MenuItem) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      description: item.description || "",
      price: item.price.toString(),
      category: item.category,
      is_available: item.is_available,
      is_featured: item.is_featured,
    })
    setDialogOpen(true)
  }

  const handleSave = async () => {
    setSaving(true)
    const data = {
      name: formData.name,
      description: formData.description || null,
      price: parseFloat(formData.price),
      category: formData.category,
      is_available: formData.is_available,
      is_featured: formData.is_featured,
    }

    if (editingItem) {
      await supabase.from("menu_items").update(data).eq("id", editingItem.id)
    } else {
      await supabase.from("menu_items").insert(data)
    }

    setSaving(false)
    setDialogOpen(false)
    fetchItems()
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      await supabase.from("menu_items").delete().eq("id", id)
      fetchItems()
    }
  }

  const toggleAvailability = async (item: MenuItem) => {
    await supabase.from("menu_items").update({ is_available: !item.is_available }).eq("id", item.id)
    fetchItems()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary">Menu Items</h1>
          <p className="text-muted-foreground mt-1">Manage your tea shop menu</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog} className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-serif text-primary">
                {editingItem ? "Edit Menu Item" : "Add Menu Item"}
              </DialogTitle>
              <DialogDescription>
                {editingItem ? "Update the menu item details" : "Add a new item to your menu"}
              </DialogDescription>
            </DialogHeader>
            <FieldGroup className="mt-4">
              <Field>
                <FieldLabel>Name</FieldLabel>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Masala Chiya"
                />
              </Field>
              <Field>
                <FieldLabel>Description</FieldLabel>
                <Input
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g., Traditional spiced tea..."
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>Price (Rs.)</FieldLabel>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="80"
                  />
                </Field>
                <Field>
                  <FieldLabel>Category</FieldLabel>
                  <Select
                    value={formData.category}
                    onValueChange={(v) => setFormData({ ...formData, category: v as "chiya" | "coffee" | "snacks" })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.is_available}
                    onCheckedChange={(v) => setFormData({ ...formData, is_available: v })}
                  />
                  <span className="text-sm">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.is_featured}
                    onCheckedChange={(v) => setFormData({ ...formData, is_featured: v })}
                  />
                  <span className="text-sm">Featured</span>
                </div>
              </div>
            </FieldGroup>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} disabled={saving || !formData.name || !formData.price}>
                {saving ? <Spinner className="mr-2" /> : null}
                {editingItem ? "Update" : "Add Item"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="border-primary/10">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
            >
              <UtensilsCrossed className="w-4 h-4 mr-2" />
              All Items
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat.value}
                variant={filter === cat.value ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(cat.value)}
              >
                <cat.icon className="w-4 h-4 mr-2" />
                {cat.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-primary/10">
        <CardHeader>
          <CardTitle className="font-serif">
            {filter === "all" ? "All Menu Items" : `${categories.find(c => c.value === filter)?.label} Items`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Spinner className="w-6 h-6" />
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No items found. Add your first menu item!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <span className="font-medium">{item.name}</span>
                          {item.is_featured && (
                            <span className="ml-2 text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded">
                              Featured
                            </span>
                          )}
                          {item.description && (
                            <p className="text-sm text-muted-foreground truncate max-w-xs">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="capitalize">{item.category}</TableCell>
                      <TableCell>Rs. {item.price}</TableCell>
                      <TableCell>
                        <Switch
                          checked={item.is_available}
                          onCheckedChange={() => toggleAvailability(item)}
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="ghost" onClick={() => openEditDialog(item)}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-destructive" onClick={() => handleDelete(item.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
