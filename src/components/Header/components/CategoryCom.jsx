import React, { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory, setChoosen } from '../../../features/categorySlice/categorySlice';
import { getFilter } from '../../../features/filterSlice/filterSlice';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { setSortingList } from '../../../features/productSlice/productSlice';


const CategoryCom = () => {
    const [select, setSelect] = useState("")
    const dispatch = useDispatch();

    const { categoryList, loadingCategory, errorCategory } = useSelector((state) => state.category);

    console.log(categoryList)
    const handleChange = (e) => {
        dispatch(setSortingList([]))
        e.preventDefault()
        dispatch(setChoosen(e.target.value))
        dispatch(getFilter())
        setSelect("Select Category")


    }
    useEffect(() => {

        dispatch(getCategory())

    }, [])
    return (<>
        {errorCategory && (
            <Typography variant="h3" color="error" align="center" mt={20}>
                err
            </Typography>
        )}
        {loadingCategory && (
            <Box display="flex" alignItems="center" justifyContent="center">
                loading
            </Box>
        )}
        {!loadingCategory && (
            <Box
                xs={{ d: "flex" }}
                display="flex"
                alignItems="center"
                justifyContent="space-evenly"
                flexWrap="wrap"
            >
                <FormControl style={{ width: "12rem" }}>
                    <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Select Category"
                        onChange={handleChange}
                        value={select}
                    >
                        {categoryList?.map((item, index) => (
                            <MenuItem value={item} key={index}>{item}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        )}
    </>)
}

export default CategoryCom