'use client'
import { stat } from 'fs'
import { SyntheticEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

type Dosen = {
    "id": number,
    "nip": number,
    "nidn": number,
    "nama": string,
    "pendidikan": string
}



export default function UpdateDosen(dosen: Dosen) {
    const [id, setId] = useState(dosen.id)
    const [nip, setNip] = useState(dosen.nip)
    const [nidn, setNidn] = useState(dosen.nidn)
    const [nama, setNama] = useState(dosen.nama)
    const [pendidikan, setPendidikan] = useState(dosen.pendidikan)
    const [modal, setModal] = useState(false)
    const [isMutating, setIsMutating] = useState(false)

    const router = useRouter()

    async function handleUpdate(e: SyntheticEvent) {
        e.preventDefault()

        setIsMutating(true)

        await fetch(`http://localhost:5000/dosen/${dosen.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                nip: nip,
                nidn: nidn,
                nama: nama,
                pendidikan: pendidikan
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
                    <h3 className="font-bold text-lg">Edit {dosen.nama}</h3>
                    <form onSubmit={handleUpdate}>
                        <div className="form-control">
                            <label className="label fomt-bold">ID</label>
                            <input type="text" className="input w-full input-bordered" value={id} onChange={(e) => setId(Number(e.target.value))} placeholder="ID" />
                        </div>
                        <div className="form-control">
                            <label className="label fomt-bold">NIP</label>
                            <input type="text" className="input w-full input-bordered" value={nip} onChange={(e) => setNip(Number(e.target.value))} placeholder="NIP" />
                        </div>
                        <div className="form-control">
                            <label className="label fomt-bold">NIDN</label>
                            <input type="text" className="input w-full input-bordered" value={nidn} onChange={(e) => setNidn(Number(e.target.value))} placeholder="NIDN" />
                        </div>
                        <div className="form-control">
                            <label className="label fomt-bold">Nama</label>
                            <input type="text" className="input w-full input-bordered" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Nama" />
                        </div>
                        <div className="form-control">
                            <label className="label fomt-bold">Alamat</label>
                            <input type="text" className="input w-full input-bordered" value={pendidikan} onChange={(e) => setPendidikan(e.target.value)} placeholder="Pendidikan" />
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
