type dataType = "overall" | "recent" | "rising";

export const toPresentableData = (rows : Array<any>, type : dataType) => {
    let typeIdx = 0;

    switch (type) {
        case "overall":
            typeIdx = 3;
            break;
        case "rising" :
            typeIdx = 2;
            break;
        case "recent":
            typeIdx = 1;
            break;
    }

    if(typeIdx === 2) {
        const tagArr = rows.map(row => {
            return {name : row[0], risingRate : row[4] / row[2]}
        }).sort((a,b) => b.risingRate - a.risingRate);

        if(tagArr.length > 10) {
            return tagArr.slice(0,10).map(tag => {
                return {
                    label : tag.name,
                    y : tag.risingRate * 100
                }
            })
        }
        else {
            return tagArr.map(tag => {
                return {
                    label : tag.name,
                    y : tag.risingRate * 100
                }
            })
        }
    }

    else {
        const tagArr = rows.map(row => {
            return {name : row[0], count : row[typeIdx]}
        }).sort((a,b) => b.count - a.count);

        let allCount = 0;
        tagArr.forEach((tag => allCount += tag.count));

        if(tagArr.length > 10) {
            return tagArr.slice(0,10).map(tag => {
                return {
                    label : tag.name,
                    y : ((tag.count / allCount) * 100)
                }
            })
        }
        else {
            return tagArr.map(tag => {
                return {
                    label : tag.name,
                    y : ((tag.count / allCount) * 100)
                }
            })
        }
    }
};

export const toDetailData = (rows : Array<any>, type : dataType) => {
    let typeIdx = 0;

    switch (type) {
        case "overall":
            typeIdx = 3;
            break;
        case "recent":
            typeIdx = 1;
            break;
    }

    return rows.map(row => {
        return {
            v : row[typeIdx],
            label : row[0]
        }
    })
};