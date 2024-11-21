import { AtUri } from '@atproto/syntax'

import { getMdInfo, getMdsInfo } from '$lib/mdInfos'
import { didToPds, listRecords } from '$modules/at/helper'

export const load = async (event) => {
  const mds = getMdsInfo().map((file) => {
    const { link_under_blog, date, title } = getMdInfo(file.link_under_blog)
    return {
      link_under_blog,
      date,
      title,
    }
  })

  const mds2 = []
  // https://atproto-browser.vercel.app/at/jyc.dev
  // const handleResolver = new HandleResolver({})
  // const did = await handleResolver.resolve('jyc.dev')
  const did = 'did:plc:dacfxuonkf2qtqft22sc23tu'

  const pds = await didToPds(did)
  if (pds) {
    // const repo = pds ? await describeRepo(pds, did) : null;
    // console.log(`repo`, repo);

    const records = await listRecords(pds, did, 'com.whtwnd.blog.entry')
    // console.log(`records`, records.records);

    for (const record of records.records) {
      // const recordData = await getRecord(
      //   pds,
      //   did,
      //   "com.whtwnd.blog.entry",
      //   record.uri
      // );
      // console.log(`recordData`, recordData);
      const uriObj = new AtUri(record.uri)
      mds2.push({
        link_under_blog: `${pds.replace('https://', '')}/${did}${uriObj.pathname}`,
        date: record.value.createdAt.split('T')[0],
        title: record.value.title,
      })
    }
  }

  return { mds: [...mds2, ...mds] }
}
