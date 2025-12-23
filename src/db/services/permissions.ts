import { UserPermission } from '../models/users-permissions'
import type { FindOnePermissionSchema } from '../schemas/permissions'

export const findOnePermission = async (opts: FindOnePermissionSchema) =>
    await UserPermission.count({ where: { ...opts } })
