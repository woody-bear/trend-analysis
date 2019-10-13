/*ranking of keywords which are used with specific language*/
export const query1 = (language : string, period : number) : string => {
    return `
    select TOP 50
        RecentCol.Tag,
        RecentCnt,
        row_number() over (order by recentCol.recentCnt desc) as RecentRank,
        TotalCnt,
        row_number() over (order by totalCol.totalCnt desc) as TotalRank
    from
    (
        select b.TagName as Tag, count(a.PostId) as recentCnt
        from
            (select PostId
            from Tags, PostTags, Posts
            where Tags.Id = TagId 
                and Posts.Id = PostId
                and TagName = '${language}'
                ) as a
    
        INNER JOIN
    
            (select PostId, Tags.TagName
            from Tags, PostTags, Posts
            where Tags.Id = TagId
                and Posts.Id = PostId
                and TagName not like '%${language}%'
                and CreationDate > DATEADD(month , -${period}, GETDATE())
                and CreationDate < GETDATE()
                ) as b
        
        on a.PostId = b.PostId
        group by b.TagName
    ) as recentCol
    
    INNER JOIN
    
    (
        select d.TagName as Tag, count(c.PostId) as TotalCnt
        from
            (select PostId
            from Tags, PostTags, Posts
            where Tags.Id = TagId 
                and Posts.Id = PostId
                and TagName = '${language}'
                ) as c
        
            INNER JOIN
        
            (select PostId, Tags.TagName
            from Tags, PostTags, Posts
            where Tags.Id = TagId
                and Posts.Id = PostId
                and TagName not like '%${language}%'
                and CreationDate > DATEADD(year , -4, GETDATE())
                and CreationDate < DATEADD(year , -1, GETDATE())
                ) as d
        
            on c.PostId = d.PostId
            group by d.TagName
            having count(c.PostId) > 3000
        ) as TotalCol

    on RecentCol.Tag = TotalCol.Tag
    
    order by recentCol.recentCnt desc;`
};


/*ranking of keywords in specific period*/
export const query2 = (period : number) : string => {
    return`
    select 
       num.TagName as Tag,
       row_number() over (order by rate.Rate desc) as MayRank,
       row_number() over (order by num.Num desc) as TotalRank,
       rate.Rate as QuestionsInMay,
       num.Num as QuestionsTotal
    
    from
        (select count(PostId) as Rate, TagName
        from Tags, PostTags, Posts
        where Tags.Id = PostTags.TagId 
            and Posts.Id = PostId
            and Posts.CreationDate < DATEADD(month , -${period}, GETDATE())
            and Posts.CreationDate > GETDATE()
        group by TagName
        ) as rate
        
        INNER JOIN
        
        (select count(PostId) as Num, TagName
        from
          Tags, PostTags, Posts
        where Tags.Id = PostTags.TagId and Posts.Id = PostId
        group by TagName
        having count(PostId) > 3000
        ) as num 
        ON rate.TagName = num.TagName
    
    order by rate.rate desc
    ;
    `
};