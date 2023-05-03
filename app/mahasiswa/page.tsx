import addMahasiswa from "./addMahasiswa"
import deleteMahasiswa from "./deleteMahasiswa"
import updateMahasiswa from "./updateMahasiswa"
import dynamic from "next/dynamic"
import { Suspense } from "react"

type Mahasiswa = {
    "id": number,
    "nim": number,
    "nama": string,
    "alamat": string,
    "hp": number,
    "angkatan": number,
    "status": string
}

async function getMahasiswa() {
    const res = await fetch('http://localhost:5000/mahasiswa', { cache: 'no-store' })
    return res.json()
}

export default async function MahasiswaList() {
    const mahasiswa: Mahasiswa[] = await getMahasiswa()

    const MahasiswaList = dynamic(() => import("./addMahasiswa"), {
        suspense: true,
    })

    const DeleteMahasiswa = dynamic(() => import("./deleteMahasiswa"), {
        suspense: true
    })

    const UpdateMahasiswa = dynamic(() => import("./updateMahasiswa"), {
        suspense: true
    })

    return (
        <div className="py-10 px-10">
            <div className="py-2">
                <Suspense fallback={<div></div>}>
                    <MahasiswaList />
                </Suspense>
            </div>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>nim</th>
                        <th>nama</th>
                        <th>alamat</th>
                        <th>hp</th>
                        <th>angkatan</th>
                        <th>status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {mahasiswa.map((mahasiswa, index) => (
                        <tr key={mahasiswa.id}>
                            <td>{index + 1}</td>
                            <td>{mahasiswa.nim}</td>
                            <td>{mahasiswa.nama}</td>
                            <td>{mahasiswa.alamat}</td>
                            <td>{mahasiswa.hp}</td>
                            <td>{mahasiswa.angkatan}</td>
                            <td>{mahasiswa.status}</td>
                            <td className="flex">
                                <UpdateMahasiswa {...mahasiswa} />
                                <DeleteMahasiswa {...mahasiswa} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
