/*ranking of keywords which are used with specific language*/
export const query1 =
    `
    select
    RecentCol.Tag,
    RecentCnt,
    row_number() over (order by recentCol.recentCnt desc) as RecentRank,
    TotalCnt,
    row_number() over (order by totalCol.totalCnt desc) as TotalRank
from
(
  select b.TagName as Tag,
      count(a.PostId) as recentCnt
  from

  (select PostId
    from Tags, PostTags, Posts
      where Tags.Id = TagId and Posts.Id = PostId
      and TagName = 'python') as a

  INNER JOIN

  (select PostId, Tags.TagName
    from Tags, PostTags, Posts
    where Tags.Id = TagId
        and Posts.Id = PostId
        and TagName not like '%python%'
        and CreationDate > '2019-07-06'
        and CreationDate < '2019-10-06'
        ) as b

  on a.PostId = b.PostId

  group by b.TagName
) as recentCol

INNER JOIN

(
  select d.TagName as Tag,
      count(c.PostId) as TotalCnt
  from

  (select PostId
    from Tags, PostTags, Posts
      where Tags.Id = TagId and Posts.Id = PostId
      and TagName = 'python') as c

  INNER JOIN

  (select PostId, Tags.TagName
    from Tags, PostTags, Posts
    where Tags.Id = TagId
        and Posts.Id = PostId
        and TagName not like '%python%'
        ) as d

  on c.PostId = d.PostId
  group by d.TagName
  having count(c.PostId) > 10000
) as TotalCol

on RecentCol.Tag = TotalCol.Tag

order by recentCol.recentCnt desc
;`;