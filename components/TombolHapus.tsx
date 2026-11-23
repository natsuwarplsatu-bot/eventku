
"use client";

import { hapusEvent } from "@/app/admin/action";

export default function TombolHapus({
  id,
}: {
  id: number;
}) {
  return (
    <form action={hapusEvent}>
      <input
        type="hidden"
        name="id"
        value={id}
      />

      <button
        type="submit"
        onClick={(event) => {
          const yakin = window.confirm(
            "Apakah kamu yakin ingin menghapus event ini?"
          );

          if (!yakin) {
            event.preventDefault();
          }
        }}
        className="text-red-600 underline"
      >
        Hapus
      </button>
    </form>
  );
}
