"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Eye, EyeOff, GripVertical } from "lucide-react";
import type { GalleryImage } from "@/lib/types/database";

export default function GalleryDashboardPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    image_url: "",
    alt_text: "",
    display_order: 0,
    is_visible: true,
  });

  const supabase = createClient();

  const fetchImages = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("display_order");

    if (!error && data) {
      setImages(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const openAddDialog = () => {
    setEditingImage(null);

    setFormData({
      title: "",
      image_url: "",
      alt_text: "",
      display_order: images.length + 1,
      is_visible: true,
    });

    setDialogOpen(true);
  };

  const openEditDialog = (image: GalleryImage) => {
    setEditingImage(image);

    setFormData({
      title: image.title,
      image_url: image.image_url,
      alt_text: image.alt_text || "",
      display_order: image.display_order,
      is_visible: image.is_visible,
    });

    setDialogOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("gallery")
      .upload(fileName, file);

    if (error) {
      alert("Image upload failed");
      return;
    }

    const { data } = supabase.storage.from("gallery").getPublicUrl(fileName);

    setFormData((prev) => ({
      ...prev,
      image_url: data.publicUrl,
    }));
  };

  const handleSave = async () => {
    setSaving(true);

    const data = {
      title: formData.title,
      image_url: formData.image_url,
      alt_text: formData.alt_text || null,
      display_order: formData.display_order,
      is_visible: formData.is_visible,
    };

    if (editingImage) {
      await supabase
        .from("gallery_images")
        .update(data)
        .eq("id", editingImage.id);
    } else {
      await supabase.from("gallery_images").insert(data);
    }

    setSaving(false);
    setDialogOpen(false);
    fetchImages();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this image?")) {
      await supabase.from("gallery_images").delete().eq("id", id);

      fetchImages();
    }
  };

  const toggleVisibility = async (image: GalleryImage) => {
    await supabase
      .from("gallery_images")
      .update({ is_visible: !image.is_visible })
      .eq("id", image.id);

    fetchImages();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary">
            Gallery
          </h1>

          <p className="text-muted-foreground mt-1">
            Manage your photo gallery
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog}>
              <Plus className="w-4 h-4 mr-2" />
              Add Image
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingImage ? "Edit Image" : "Add Image"}
              </DialogTitle>

              <DialogDescription>
                {editingImage
                  ? "Update the image details"
                  : "Add a new image to your gallery"}
              </DialogDescription>
            </DialogHeader>

            <FieldGroup className="mt-4">
              <Field>
                <FieldLabel>Title</FieldLabel>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </Field>

              <Field>
                <FieldLabel>Upload Image</FieldLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Field>

              <Field>
                <FieldLabel>Alt Text</FieldLabel>
                <Input
                  value={formData.alt_text}
                  onChange={(e) =>
                    setFormData({ ...formData, alt_text: e.target.value })
                  }
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>Display Order</FieldLabel>
                  <Input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        display_order: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </Field>

                <Field>
                  <FieldLabel>Visibility</FieldLabel>

                  <div className="flex items-center gap-2 h-10">
                    <Switch
                      checked={formData.is_visible}
                      onCheckedChange={(v) =>
                        setFormData({
                          ...formData,
                          is_visible: v,
                        })
                      }
                    />

                    <span className="text-sm">
                      {formData.is_visible ? "Visible" : "Hidden"}
                    </span>
                  </div>
                </Field>
              </div>
            </FieldGroup>

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>

              <Button
                onClick={handleSave}
                disabled={saving || !formData.title || !formData.image_url}
              >
                {saving ? <Spinner className="mr-2" /> : null}

                {editingImage ? "Update" : "Add Image"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gallery Images</CardTitle>
          <CardDescription>Manage your gallery photos</CardDescription>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <Spinner />
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No images found
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="relative group rounded-lg border overflow-hidden"
                >
                  <div className="aspect-video bg-muted">
                    <img
                      src={image.image_url}
                      alt={image.alt_text || image.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-3">
                    <div className="flex justify-between">
                      <span className="text-xs">#{image.display_order}</span>

                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleVisibility(image)}
                        >
                          {image.is_visible ? (
                            <Eye className="w-4 h-4" />
                          ) : (
                            <EyeOff className="w-4 h-4" />
                          )}
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => openEditDialog(image)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(image.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>

                    <h3 className="font-medium mt-2">{image.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
