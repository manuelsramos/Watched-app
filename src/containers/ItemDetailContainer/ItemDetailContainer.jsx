import { doc, getDoc, getFirestore } from 'firebase/firestore'
import React from 'react'
import { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import ItemDetail from '../../Components/ItemDetail/ItemDetail'
import { Loader } from '../../Components/Loader/Loader'


const ItemDetailContainer = () => {
    const [product, setProduct] = useState({})
    const { productId } = useParams()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const datab = getFirestore()
        const queryDoc = doc(datab, 'productos', productId)

        getDoc(queryDoc)
            .then(resp => setProduct({ id: resp.id, ...resp.data() }))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, [])

    return (
        <>
            {loading
                ? <Loader />
                : <Container>
                    <Row>
                        <ItemDetail product={product} />
                    </Row>
                </Container>}
        </>
    )
}

export default ItemDetailContainer