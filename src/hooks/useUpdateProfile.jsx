import { useContext } from 'react'
import { AuthContext } from '../contexts/auth'

import { doc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage'
import { db, storage } from '../config/fireBaseConnection'
import { toast } from 'react-toastify'

const useUpdateProfile = () => {

    const { user, setUser, storageUser } = useContext(AuthContext)

    const updateProfile = async (name, avatarImage, avatarUrl) => {

        if (name !== '' && avatarImage === null) {

            let userUid = user.uid

            const docRef = doc(db, "users", userUid)
            await updateDoc(docRef, {
                name: name,
            }).then(() => {
                let data = {
                    ...user,
                    name: name,
                }

                setUser(data)
                storageUser(data)
                toast.success("Updated successfully")
            })
                .catch((error) => {
                    toast.error(error)
                    console.log(error)
                })
        } else if (name !== '' && avatarImage !== null) {

            let userUid = user.uid

            const uploadRef = ref(storage, `images/${userUid}/${avatarImage.name}`)
            uploadBytes(uploadRef, avatarImage)
                .then((snapshot) => {
                    getDownloadURL(snapshot.ref)
                        .then(async (downloadUrl) => {
                            const docRef = doc(db, "users", userUid)
                            await updateDoc(docRef, {
                                ...user,
                                name: name,
                                avatarUrl: downloadUrl,
                            })
                                .then(() => {
                                    let data = {
                                        ...user,
                                        name: name,
                                        avatarUrl: downloadUrl,
                                    }

                                    setUser(data)
                                    storageUser(data)
                                    toast.success("Updated successfully")
                                })
                        })
                        .catch((error) => {
                            toast.error(error)
                        })
                })
        }
    }

    return { updateProfile }
}

export default useUpdateProfile;