import JSONData from "../modle/Schema.js";

const createData = async (data) => {
  try {
    if (
      !data.intensity ||
      !data.sector ||
      !data.topic ||
      !data.insight ||
      !data.url ||
      !data.region ||
      !data.added ||
      !data.published ||
      !data.country ||
      !data.relevance ||
      !data.pestle ||
      !data.source ||
      !data.title ||
      !data.likelihood
    ) {
      throw new Error("Missing required fields");
    }

    
    const endYear = data.end_year || null;
    const startYear = data.start_year || null;

    let dataDetails = new JSONData({
      endYear: endYear,
      intensity: data.intensity,
      sector: data.sector,
      topic: data.topic,
      insight: data.insight,
      url: data.url,
      region: data.region,
      startYear: startYear,
      impact: data.impact,
      added: data.added,
      published: data.published,
      country: data.country,
      relevance: data.relevance,
      pestle: data.pestle,
      source: data.source,
      title: data.title,
      likelihood: data.likelihood,
    });

    await dataDetails.save();
    console.log("JSON data saved");
  } catch (error) {
    console.error("Error saving data", error);
    throw error; 
  }
};

const getData = async (req, res) => {
  
  try {
    const dataList = await JSONData.find({});
    if (dataList.length > 0) {
      console.log("Data fetched successfully");
      return dataList
    } else {
      console.log("Data list emplty");
    }
  } catch (error) {
    console.log("Internal server error");
  }
};

const saveMultipalData = async(dataArray)=>{
  try {
    const result = await JSONData.insertMany(dataArray)
  } catch (error) {
    console.log("Error saving multipal data",error);
  }
}

export  { getData, createData, saveMultipalData };
