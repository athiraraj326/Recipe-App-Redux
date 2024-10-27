import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllRecipes = createAsyncThunk('recipes/fetchAllRecipes', async ()=>{
   const result = await axios.get("https://dummyjson.com/recipes")
   sessionStorage.setItem("allRecipes",JSON.stringify(result.data.recipes))
//    console.log(result);
   return result.data.recipes
})

const recipeSlice = createSlice({
    name:'recipes',
    initialState:{
        allRecipes:[],
        dummyRecipe:[],
        loading:false,
        error:""
    },
    reducers:{
        searchRecipe:(state,searchKey)=>{
           state.allRecipes = state.dummyRecipe.filter(item=>item.cuisine.toLowerCase().includes(searchKey.payload))
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchAllRecipes.fulfilled,(state,apiResult)=>{
            state.allRecipes = apiResult.payload
            state.dummyRecipe = apiResult.payload
            state.loading = false
            state.error = ""
        })
        builder.addCase(fetchAllRecipes.pending,(state,apiResult)=>{
            state.allRecipes = []
            state.dummyRecipe = []
            state.loading = true
            state.error = ""
        })
        builder.addCase(fetchAllRecipes.rejected,(state,apiResult)=>{
            state.allRecipes = []
            state.dummyRecipe = []
            state.loading = true
            state.error = "API Call Failed"
        })
    }
})

export const {searchRecipe} = recipeSlice.actions
export default recipeSlice.reducer