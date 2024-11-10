import { Entity, Fields, Relations } from 'remult'
import { sqlRelations } from 'remult/internals'

import { Roles } from '$modules/auth/Roles'
import { LogHandleStats } from '$modules/logs/LogHandleStats'

@Entity<BSkyty>('bskyties', {
  allowApiCrud: Roles.admin,
  defaultOrderBy: {
    firstTimeHere: 'desc',
  },
})
export class BSkyty {
  @Fields.cuid({ caption: 'did' })
  id!: string

  @Fields.string()
  handle = ''

  @Fields.string()
  displayName = ''

  @Fields.string({
    sqlExpression: () => {
      return sqlRelations(BSkyty).stats.$first({ orderBy: { updatedAt: 'desc' } }).emoji
    },
  })
  lastEmoji = ''

  @Fields.string()
  avatar = ''

  @Fields.date()
  firstTimeHere = new Date()

  @Relations.toMany<BSkyty, LogHandleStats>(() => LogHandleStats, {
    field: 'did',
  })
  stats: LogHandleStats[] = []
}
