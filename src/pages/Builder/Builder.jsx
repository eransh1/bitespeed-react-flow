import React from 'react'
import styles from "./Builder.module.css"
import Navbar from '../Navbar/Navbar'
import FlowLayout from './FlowLayout'

const Builder = () => {

  return (
    <>
    <Navbar/>
    <section style={{ width: '100%', height: '90vh' }} className={styles.outerCont}>
    <FlowLayout/>
    </section>
    </>
  )
}

export default Builder