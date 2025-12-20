import DepartmentData from "../Models/Department.js";

export const addDep=async(req,res)=>{
    console.log(req.body,'pppppppppppppppp');
    try{
    let {deptName}=req.body
    const dep=await DepartmentData({DepartmentName:deptName})
    await dep.save()
    res.status(200).json({message:"Department added"})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"server error"})
    }
}
export const getDepartments = async (req, res) => {
  try {
    const departments = await DepartmentData.find();
    res.status(200).json(departments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};