import addDosen from "./addDosen"
import deleteDosen from "./deleteDosen"
import updateDosen from "./updateDosen"
import dynamic from "next/dynamic"
import { Suspense } from "react"

type Dosen = {
    "id": number,
    "nip": number,
    "nidn": number,
    "nama": string,
    "pendidikan": string
}

async function getDosen() {
    const res = await fetch('http://localhost:5000/dosen', { cache: 'no-store' })
    return res.json()
}

export default async function DosenList() {
    const dosen: Dosen[] = await getDosen()

    const DosenList = dynamic(() => import("./addDosen"), {
        suspense: true,
    })

    const DeleteDosen = dynamic(() => import("./deleteDosen"), {
        suspense: true
    })

    const UpdateDosen = dynamic(() => import("./updateDosen"), {
        suspense: true
    })

    return (
        <div className="py-10 px-10">
            <div className="py-2">
                <Suspense fallback={<div></div>}>
                    <DosenList />
                </Suspense>
            </div>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>nip</th>
                        <th>nidn</th>
                        <th>nama</th>
                        <th>pendidikan</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {dosen.map((dosen, index) => (
                        <tr key={dosen.id}>
                            <td>{index + 1}</td>
                            <td>{dosen.nip}</td>
                            <td>{dosen.nidn}</td>
                            <td>{dosen.nama}</td>
                            <td>{dosen.pendidikan}</td>
                            <td className="flex">
                                <UpdateDosen {...dosen} />
                                <DeleteDosen {...dosen} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
