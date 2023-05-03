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

export default function DeleteDosen(dosen: Dosen) {
    const [modal, setModal] = useState(false)
    const [isMutating, setIsMutating] = useState(false)

    const router = useRouter()

    async function handleDelete(dosenId: number) {
        setIsMutating(true)

        await fetch(`http://localhost:5000/dosen/${dosenId}`, {
            method: 'DELETE'
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

            <button className="btn btn-error btn-sm" onClick={handleChange}>Delete</button>

            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />

            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are sure to delete {dosen.nama}?</h3>
                    <div className="modal-action">
                        <button type="button" className="btn" onClick={handleChange}>Close</button>
                        {!isMutating ? (
                            <button type="button" onClick={() => handleDelete(dosen.id)} className="btn btn-primary">Delete</button>
                        ) : (
                            <button type="button" className="btn loading">Deleting...</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
