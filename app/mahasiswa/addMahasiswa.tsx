'use client'
import { stat } from 'fs'
import { SyntheticEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddMahasiswa() {
    const [id, setId] = useState("")
    const [nim, setNim] = useState("")
    const [nama, setNama] = useState("")
    const [alamat, setAlamat] = useState("")
    const [hp, setHp] = useState("")
    const [angkatan, setAngkatan] = useState("")
    const [status, setStatus] = useState("")
    const [modal, setModal] = useState(false)
    const [isMutating, setIsMutating] = useState(false)

    const router = useRouter()

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault()

        setIsMutating(true)

        await fetch('http://localhost:5000/mahasiswa', {
            method: 'POST',
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

        setId(""),
            setNim(""),
            setNama(""),
            setAlamat(""),
            setHp(""),
            setAngkatan(""),
            setStatus("")
        router.refresh()
        setModal(false)
    }

    function handleChange() {
        setModal(!modal)
    }
    return (
        <div>

            <button className="btn" onClick={handleChange}>Add New</button>

            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />

            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add new Mahasiswa</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label fomt-bold">ID</label>
                            <input type="text" className="input w-full input-bordered" value={id} onChange={(e) => setId(e.target.value)} placeholder="ID" />
                        </div>
                        <div className="form-control">
                            <label className="label fomt-bold">NIM</label>
                            <input type="text" className="input w-full input-bordered" value={nim} onChange={(e) => setNim(e.target.value)} placeholder="NIM" />
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
                            <input type="text" className="input w-full input-bordered" value={hp} onChange={(e) => setHp(e.target.value)} placeholder="HP" />
                        </div>
                        <div className="form-control">
                            <label className="label fomt-bold">Angkatan</label>
                            <input type="text" className="input w-full input-bordered" value={angkatan} onChange={(e) => setAngkatan(e.target.value)} placeholder="Angkatan" />
                        </div>
                        <div className="form-control">
                            <label className="label fomt-bold">Status</label>
                            <input type="text" className="input w-full input-bordered" value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Status" />
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn" onClick={handleChange}>Close</button>
                            {!isMutating ? (
                                <button type="submit" className="btn btn-primary">Save</button>
                            ) : (
                                <button type="submit" className="btn loading">Saving...</button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
