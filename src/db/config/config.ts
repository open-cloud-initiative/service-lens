import { Environment } from '@/db/models/environment'
import { Lens } from '@/db/models/lens'
import { LensPillarChoice } from '@/db/models/lens-pillar-choices'
import { LensPillarChoiceResource } from '@/db/models/lens-pillar-choices-resources'
import { LensPillarQuestion } from '@/db/models/lens-pillar-questions'
import { LensPillarQuestionResource } from '@/db/models/lens-pillar-questions-resources'
import { LensPillarResource } from '@/db/models/lens-pillar-resources'
import { LensPillarQuestionRisk } from '@/db/models/lens-pillar-risks'
import { LensPillar } from '@/db/models/lens-pillars'
import { Ownership } from '@/db/models/ownership'
import { Permission } from '@/db/models/permissions'
import { Profile } from '@/db/models/profile'
import { ProfileQuestion } from '@/db/models/profile-question'
import { ProfileQuestionAnswer } from '@/db/models/profile-question-answers'
import { ProfileQuestionChoice } from '@/db/models/profile-question-choice'
import { Role } from '@/db/models/roles'
import { RolePermission } from '@/db/models/roles-permissions'
import { Solution } from '@/db/models/solution'
import { SolutionComment } from '@/db/models/solution-comments'
import { SolutionTemplate } from '@/db/models/solution-templates'
import { Tag } from '@/db/models/tags'
import { TagTaggable } from '@/db/models/tags-taggable'
import { Team } from '@/db/models/teams'
import { User } from '@/db/models/users'
import { UserPermission } from '@/db/models/users-permissions'
import { UserRole } from '@/db/models/users-roles'
import { UserTeam } from '@/db/models/users-teams'
import { Workload } from '@/db/models/workload'
import { WorkloadEnvironment } from '@/db/models/workload-environment'
import { WorkloadLens } from '@/db/models/workload-lens'
import { WorkloadLensAnswer } from '@/db/models/workload-lenses-answers'
import { WorkloadLensesAnswerChoice } from '@/db/models/workload-lenses-answers-choices'
import type { SequelizeOptions } from 'sequelize-typescript'
import { Sequelize } from 'sequelize-typescript'

const env = process.env.NODE_ENV || 'development'

const models = [
    Environment,
    Lens,
    LensPillar,
    LensPillarChoice,
    LensPillarChoiceResource,
    LensPillarQuestion,
    LensPillarQuestionResource,
    LensPillarQuestionRisk,
    LensPillarResource,
    Ownership,
    Permission,
    Profile,
    ProfileQuestion,
    ProfileQuestionAnswer,
    ProfileQuestionChoice,
    Role,
    RolePermission,
    Solution,
    SolutionComment,
    SolutionTemplate,
    Tag,
    TagTaggable,
    Team,
    User,
    UserPermission,
    UserRole,
    UserTeam,
    Workload,
    WorkloadEnvironment,
    WorkloadLens,
    WorkloadLensAnswer,
    WorkloadLensesAnswerChoice,
]

export interface Config {
    [index: string]: SequelizeOptions
}

export const config: Config = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialectModule: require('pg'),
        dialect: 'postgres',
        models,
    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialectModule: require('pg'),
        dialect: 'postgres',
        logging: false,
        models,
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'postgres',
        dialectModule: require('pg'),
        models,
    },
}

const connection = new Sequelize({ ...config[env] })

export { Sequelize }
export default connection
