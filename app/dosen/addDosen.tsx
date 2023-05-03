'use client'
import { stat } from 'fs'
import { SyntheticEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddMahasiswa() {
    const [id, setId] = useState("")
    const [nip, setNip] = useState("")
    const [nidn, setNidn] = useState("")
    const [nama, setNama] = useState("")
    const [pendidikan, setPendidikan] = useState("")
    const [modal, setModal] = useState(false)
    const [isMutating, setIsMutating] = useState(false)

    const router = useRouter()

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault()

        setIsMutating(true)

        await fetch('http://localhost:5000/dosen', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                nip: nip,
                nidn: nidn,
                nama: nama,
                pendidikan: pendidikan,
            })
        })

        setIsMutating(false)

        setId(""),
            setNip(""),
            setNidn(""),
            setNama(""),
            setPendidikan(""),
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
                    <h3 className="font-bold text-lg">Add new Dosen</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label fomt-bold">ID</label>
                            <input type="text" className="input w-full input-bordered" value={id} onChange={(e) => setId(e.target.value)} placeholder="ID" />
                        </div>
                        <div className="form-control">
                            <label className="label fomt-bold">NIP</label>
                            <input type="text" className="input w-full input-bordered" value={nip} onChange={(e) => setNip(e.target.value)} placeholder="NIP" />
                        </div>
                        <div className="form-control">
                            <label className="label fomt-bold">NIDN</label>
                            <input type="text" className="input w-full input-bordered" value={nidn} onChange={(e) => setNidn(e.target.value)} placeholder="NIDN" />
                        </div>
                        <div className="form-control">
                            <label className="label fomt-bold">Nama</label>
                            <input type="text" className="input w-full input-bordered" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Nama" />
                        </div>
                        <div className="form-control">
                            <label className="label fomt-bold">Pendidikan</label>
                            <input type="text" className="input w-full input-bordered" value={pendidikan} onChange={(e) => setPendidikan(e.target.value)} placeholder="Pendidikan" />
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
