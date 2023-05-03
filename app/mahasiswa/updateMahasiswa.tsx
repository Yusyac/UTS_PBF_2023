'use client'
import { stat } from 'fs'
import { SyntheticEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

type Mahasiswa = {
    "id": number,
    "nim": number,
    "nama": string,
    "alamat": string,
    "hp": number,
    "angkatan": number,
    "status": string
}



export default function UpdateMahasiswa(mahasiswa: Mahasiswa) {
    const [id, setId] = useState(mahasiswa.id)
    const [nim, setNim] = useState(mahasiswa.nim)
    const [nama, setNama] = useState(mahasiswa.nama)
    const [alamat, setAlamat] = useState(mahasiswa.alamat)
    const [hp, setHp] = useState(mahasiswa.hp)
    const [angkatan, setAngkatan] = useState(mahasiswa.angkatan)
    const [status, setStatus] = useState(mahasiswa.status)
    const [modal, setModal] = useState(false)
    const [isMutating, setIsMutating] = useState(false)

    const router = useRouter()

    async function handleUpdate(e: SyntheticEvent) {
        e.preventDefault()

        setIsMutating(true)

        await fetch(`http://localhost:5000/mahasiswa/${mahasiswa.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                nim: nim,
                nama: nama,
                alamat: alamat,
                hp: hp,
                angkatan: angkatan,
                status: status
            })
        })

        setIsMutating(false)

        router.refresh()
        setModal(false)
    }

    function handleChange() {
        setModal(!modal)
    }
    return (
        <div>

            <button className="btn btn-info btn-sm" onClick={handleChange}>Edit</button>

            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />

            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Edit {mahasiswa.nama}</h3>
                    <form onSubmit={handleUpdate}>
                        <div className="form-control">
                            <label className="label fomt-bold">ID</label>
                            <input type="text" className="input w-full input-bordered" value={id} onChange={(e) => setId(Number(e.target.value))} placeholder="ID" />
                        </div>
                        <div className="form-control">
                            <label className="label fomt-bold">NIM</label>
                            <input type="text" className="input w-full input-bordered" value={nim} onChange={(e) => setNim(Number(e.target.value))} placeholder="NIM" />
                        </div>
                        <div className="form-control">
                            <label className="label fomt-bold">Nama</label>
                            <input type="text" className="input w-full input-bordered" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Nama" />
                        </div>
                        <div className="form-control">
                            <label className="label fomt-bold">Alamat</label>
                            <input type="text" className="input w-full input-bordered" value={alamat} onChange={(e) => setAlamat(e.target.value)} placeholder="Alamat" />
                        </div>
                        <div className="form-control">
                            <label className="label fomt-bold">HP</label>
                            <input type="text" className="input w-full input-bordered" value={hp} onChange={(e) => setHp(Number(e.target.value))} placeholder="HP" />
                        </div>
                        <div className="form-control">
                            <label className="label fomt-bold">Angkatan</label>
                            <input type="text" className="input w-full input-bordered" value={angkatan} onChange={(e) => setAngkatan(Number(e.target.value))} placeholder="Angkatan" />
                        </div>
                        <div className="form-control">
                            <label className="label fomt-bold">Status</label>
                            <input type="text" className="input w-full input-bordered" value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Status" />
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn" onClick={handleChange}>Close</button>
                            {!isMutating ? (
                                <button type="submit" className="btn btn-primary">Update</button>
                            ) : (
                                <button type="submit" className="btn loading">Updating...</button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
