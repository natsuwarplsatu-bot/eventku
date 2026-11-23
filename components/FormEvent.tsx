
"use client";

import { useActionState, useEffect, useState } from "react";

import {
  simpanEvent,
  type HasilEvent,
} from "@/app/admin/action";

import type { Event } from "@/data/events";

function Galat({ teks }: { teks?: string }) {
  return teks ? (
    <p className="text-sm text-red-600">{teks}</p>
  ) : null;
}

export default function FormEvent({
  event,
}: {
  event?: Event;
}) {
  const awal: HasilEvent = {
    pesan: "",
    galat: {},
    isian: {
      id: event ? String(event.id) : "",
      judul: event?.judul ?? "",
      kategori: event?.kategori ?? "",
      tanggal: event?.tanggal ?? "",
      lokasi: event?.lokasi ?? "",
      harga: event ? String(event.harga) : "0",
      kuota: event ? String(event.kuota) : "",
      gambar: event?.gambar ?? "",
    },
  };

  const [isian, setIsian] = useState(awal.isian);

  const [hasil, kirim, sedangKirim] = useActionState<
    HasilEvent,
    FormData
  >(simpanEvent, awal);

  // Mempertahankan nilai dari server setelah validasi.
  useEffect(() => {
    setIsian(hasil.isian);
  }, [hasil]);

  function ubahIsian(nama: string, nilai: string) {
    setIsian((sebelumnya) => ({
      ...sebelumnya,
      [nama]: nilai,
    }));
  }

  const kolom =
    "block w-full rounded border px-3 py-2";

  return (
    <form
      action={kirim}
      className="max-w-lg space-y-3 rounded-xl border bg-white p-6"
    >
      <input
        type="hidden"
        name="id"
        value={isian.id}
      />

      <div>
        <input
          name="judul"
          value={isian.judul}
          onChange={(e) =>
            ubahIsian("judul", e.target.value)
          }
          placeholder="Judul"
          className={kolom}
        />
        <Galat teks={hasil.galat.judul} />
      </div>

      <div>
        <input
          name="kategori"
          value={isian.kategori}
          onChange={(e) =>
            ubahIsian("kategori", e.target.value)
          }
          placeholder="Kategori"
          className={kolom}
        />
        <Galat teks={hasil.galat.kategori} />
      </div>

      <div>
        <input
          name="tanggal"
          type="date"
          value={isian.tanggal}
          onChange={(e) =>
            ubahIsian("tanggal", e.target.value)
          }
          className={kolom}
        />
        <Galat teks={hasil.galat.tanggal} />
      </div>

      <div>
        <input
          name="lokasi"
          value={isian.lokasi}
          onChange={(e) =>
            ubahIsian("lokasi", e.target.value)
          }
          placeholder="Lokasi"
          className={kolom}
        />
        <Galat teks={hasil.galat.lokasi} />
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <input
            name="harga"
            type="number"
            value={isian.harga}
            onChange={(e) =>
              ubahIsian("harga", e.target.value)
            }
            placeholder="Harga"
            className={kolom}
          />
          <Galat teks={hasil.galat.harga} />
        </div>

        <div className="flex-1">
          <input
            name="kuota"
            type="number"
            value={isian.kuota}
            onChange={(e) =>
              ubahIsian("kuota", e.target.value)
            }
            placeholder="Kuota"
            className={kolom}
          />
          <Galat teks={hasil.galat.kuota} />
        </div>
      </div>

      <div>
        <input
          name="gambar"
          value={isian.gambar}
          onChange={(e) =>
            ubahIsian("gambar", e.target.value)
          }
          placeholder="Gambar (boleh kosong)"
          className={kolom}
        />
      </div>

      {hasil.pesan && (
        <p className="text-sm text-red-600">
          {hasil.pesan}
        </p>
      )}

      <button
        type="submit"
        disabled={sedangKirim}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {sedangKirim ? "Menyimpan..." : "Simpan"}
      </button>
    </form>
  );
}
