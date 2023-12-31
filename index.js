const app = require('express')()
const {gql} = require('apollo-server-express')

const PORT = process.env.PORT || 4000

// schemas

const Profiles = require('./schemas/Profiles') 
const Lectures = require('./schemas/Lectures') 
const Workshops = require('./schemas/Workshops') 
const Miracles = require('./schemas/Miracles') 

// microservices

const {middleware, mongo_connect, apollo_start, slicer, get_id} = require('./libs/microservices')

// database url

const url = 'mongodb+srv://Slavus54:ieOUiW5CNwW5gQ5D@web-2024.v43n3ay.mongodb.net/Modus-Vivendi'

// middlewares

middleware(app)
mongo_connect(url, 'MongoDB is connected...')

const typeDefs = gql`
    type Query {
        test: String!
    }
    type Cord {
        lat: Float!,
        long: Float!
    }
    input ICord {
        lat: Float!,
        long: Float!
    }
    type UserCookie {
        account_id: String!,
        username: String!,
        field: String!
    }
    type AccountComponent {
        shortid: String!,
        title: String!,
        path: String!
    }
    type Attainment {
        shortid: String!,
        title: String!,
        category: String!,
        format: String!,
        level: String!,
        photo_url: String!,
        likes: Float!
    }
    type Exercise {
        shortid: String!,
        text: String!,
        category: String!,
        weekday: String!,
        repetitions: Float!,
        photo_url: String!,
        rating: Float!
    }
    type Resource {
        shortid: String!,
        name: String!,
        title: String!,
        category: String!,
        url: String!
    }
    type Manuscript {
        shortid: String!,
        name: String!,
        headline: String!,
        tool: String!,
        size: Float!,
        photo_url: String!,
        likes: Float!
    }
    type Task {
        id: String!,
        headline: String!,
        level: String!,
        progress: Float!
    }
    input TaskInp {
        id: String!,
        headline: String!,
        level: String!,
        progress: Float!
    }
    type Member {
        account_id: String!,
        username: String!,
        role: String!,
        task: String!
    }
    type Image {
        shortid: String!,
        name: String!,
        title: String!,
        category: String!,
        photo_url: String!,
        likes: Float!
    }
    type Question {
        shortid: String!,
        name: String!,
        text: String!,
        level: String!,
        answer: String!
    }
    type Building {
        shortid: String!,
        name: String!,
        title: String!,
        category: String!,
        cords: Cord!,
        photo_url: String!,
        likes: Float!
    }
    type Miracle {
        id: ID!,
        shortid: String!,
        account_id: String!,
        username: String!,
        title: String!,
        category: String!,
        century: String!,
        region: String!,
        cords: Cord!,
        rating: Float!,
        questions: [Question]!,
        buildings: [Building]!
    }
    type Workshop {
        id: ID!,
        shortid: String!,
        account_id: String!,
        username: String!,
        title: String!,
        category: String!,
        tasks: [Task]!,
        dateUp: String!,
        time: String!,
        region: String!,
        cords: Cord!,
        telegram_tag: String!,
        members: [Member]!,
        images: [Image]!
    }
    type Lecture {
        id: ID!,
        shortid: String!,
        account_id: String!,
        username: String!,
        title: String!,
        category: String!,
        level: String!,
        directions: [String]!,
        resources: [Resource]!, 
        manuscripts: [Manuscript]!
    }
    type Profile {
        account_id: String!,
        username: String!,
        security_code: String!,
        telegram_tag: String!,
        sex: String!,
        region: String!,
        cords: Cord!,
        main_photo: String!,
        field: String!,
        attainments: [Attainment]!,
        exercises: [Exercise]!,
        account_components: [AccountComponent]!
    }
    type Mutation {
        register(username: String!, security_code: String!, telegram_tag: String!, sex: String!, region: String!, cords: ICord!, main_photo: String!) : UserCookie!
        login(security_code: String!) : UserCookie!
        getProfiles(username: String!) : [Profile]!
        getProfile(account_id: String!) : Profile
        updateProfilePersonalInfo(account_id: String!, username: String!, main_photo: String!) : String!
        updateProfileGeoInfo(account_id: String!, region: String!, cords: ICord!) : String!
        updateProfileSecurityCode(account_id: String!, security_code: String!) : String!
        manageProfileAttainment(account_id: String!, option: String!, title: String!, category: String!, format: String!, level: String!, photo_url: String!, coll_id: String!) : String!
        manageProfileExercise(account_id: String!, option: String!, text: String!, category: String!, weekday: String!, repetitions: Float!, photo_url: String!, rating: Float!, coll_id: String!) : String!
        createLecture(username: String!, id: String!, title: String!, category: String!, level: String!, directions: [String]!) : String!
        getLectures(username: String!) : [Lecture]!
        getLecture(username: String!, shortid: String!) : Lecture!
        makeLectureResource(username: String!, id: String!, title: String!, category: String!, url: String!) : String!
        manageLectureManuscript(username: String!, id: String!, option: String!, headline: String!, tool: String!, size: Float!, photo_url: String!, coll_id: String!) : String!
        subscribeLecture(username: String!, id: String!) : String!
        createWorkshop(username: String!, id: String!, title: String!, category: String!, tasks: [TaskInp]!, dateUp: String!, time: String!, region: String!, cords: ICord!, role: String!) : String!
        getWorkshops(username: String!) : [Workshop]!
        getWorkshop(username: String!, shortid: String!) : Workshop!
        manageWorkshopStatus(username: String!, id: String!, option: String!, role: String!, task: String!) : String!
        updateWorkshopTask(username: String!, id: String!, coll_id: String!, piece: Float!) : String!
        manageWorkshopImage(username: String!, id: String!, option: String!, title: String!, category: String!, photo_url: String!, coll_id: String!) : String!
        createMiracle(username: String!, id: String!, title: String!, category: String!, century: String!, region: String!, cords: ICord!, rating: Float!) : String!
        getMiracles(username: String!) : [Miracle]!
        getMiracle(username: String!, shortid: String!) : Miracle!
        makeMiracleQuestion(username: String!, id: String!, text: String!, level: String!, answer: String!) : String!
        updateMiracleRating(username: String!, id: String!, rating: Float!) : String!
        manageMiracleBuilding(username: String!, id: String!, option: String!, title: String!, category: String!, cords: ICord!, photo_url: String!, coll_id: String!) : String!
    }
`

const resolvers = {
    Query: {
        test: () => 'Hi'
    },
    Mutation: {
        register: async (_, {username, security_code, telegram_tag, sex, region, cords, main_photo}) => {
            const profile = await Profiles.findOne({username}) 
            let drop_object = {account_id: '', username, field: ''}

            if (profile === null) {

                let account_id = get_id()

                const newProfile = new Profiles({
                    account_id,
                    username,
                    security_code,
                    telegram_tag,
                    sex,
                    region,
                    cords,
                    main_photo,
                    field: '',
                    attainments: [],
                    exercises: [],
                    account_components: []
                })

                drop_object = {account_id, username, field: ''}
                
                await newProfile.save()
            } 
        
            return drop_object
        },
        login: async (_, {security_code}) => {
            const profile = await Profiles.findOne({security_code}) 
            let drop_object = {account_id: '', username: '', field: ''}
           
            if (profile) {  
                drop_object = {account_id: profile.account_id, username: profile.username, field: profile.field}                       
            }

            return drop_object
        },
        getProfiles: async (_, {username}) => {
            const profiles = await Profiles.find() 

            return profiles
        },
        getProfile: async (_, {account_id}) => {
            const profile = await Profiles.findOne({account_id}) 
            
            return profile
        },
        updateProfilePersonalInfo: async (_, {account_id, username, main_photo}) => {
            const profile = await Profiles.findOne({account_id}) 
            const new_profile = await Profiles.findOne({username})

            if (profile) {
                
                if (!new_profile) {
                    profile.username = username
                }

                profile.main_photo = main_photo

                await Profiles.updateOne({account_id}, {$set: profile})

                return 'Success'
            }

            return 'Error'
        },
        updateProfileGeoInfo: async (_, {account_id, region, cords}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {

                profile.region = region
                profile.cords = cords
             
                await Profiles.updateOne({account_id}, {$set: profile})

                return 'Success'
            }

            return 'Error'
        },
        updateProfileSecurityCode: async (_, {account_id, security_code}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {

                profile.security_code = security_code

                await Profiles.updateOne({account_id}, {$set: profile})

                return 'Success'
            }

            return 'Error'
        },
        manageProfileAttainment: async (_, {account_id, option, title, category, format, level, photo_url, coll_id}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {
                if (option === 'create') {

                    let shortid = get_id()

                    profile.field = category

                    profile.attainments = [...profile.attainments, {
                        shortid,
                        title,
                        category,
                        format,
                        level,
                        photo_url,
                        likes: 0
                    }]

                    profile.attainments = slicer(profile.attainments, 20)

                } else if (option === 'like') {

                    profile.attainments.map(el => {
                        if (el.shortid === coll_id) {
                            el.likes += 1
                        }
                    })

                } else {

                    profile.attainments = profile.attainments.filter(el => el.shortid !== coll_id)
                }

                await Profiles.updateOne({account_id}, {$set: profile})

                return 'Success'
            }

            return 'Error'
        },
        manageProfileExercise: async (_, {account_id, option, text, category, weekday, repetitions, photo_url, rating, coll_id}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {
                if (option === 'create') {

                    let shortid = get_id()

                    profile.exercises = [...profile.exercises, {
                        shortid,
                        text,
                        category,
                        weekday,
                        repetitions,
                        photo_url,
                        rating
                    }]

                    profile.exercises = slicer(profile.exercises, 20)

                } else if (option === 'delete') {

                    profile.exercises = profile.exercises.filter(el => el.shortid !== coll_id)

                } else {

                    profile.exercises.map(el => {
                        if (el.shortid === coll_id) {
                            if (option === 'update') {
                                el.photo_url = photo_url
                            } else if (option === 'rate') {
                                el.rating = rating
                            }
                        }
                    })
                }

                await Profiles.updateOne({account_id}, {$set: profile})

                return 'Success'
            }

            return 'Error'
        },
        createLecture: async (_, {username, id, title, category, level, directions}) => {
            const profile = await Profiles.findOne({username, account_id: id}) 
            const lecture = await Lectures.findOne({username, title, category, level})

            if (profile && !lecture) {
                if (profile.account_components.filter(el => el.path === 'lecture').find(el => el.title === title) === undefined) {

                    let shortid = get_id()

                    profile.account_components = [...profile.account_components, {
                        shortid,
                        title,
                        path: 'lecture'
                    }]

                    const newLecture = new Lectures({
                        shortid,
                        account_id: profile.account_id,
                        username: profile.username,
                        title,
                        category,
                        level,
                        directions,
                        resources: [], 
                        manuscripts: []
                    })

                    await Profiles.updateOne({username, account_id: id}, {$set: profile})
                    await newLecture.save()

                    return 'Success'
                } 
            }

            return 'Error'
        },
        getLectures: async (_, {username}) => {
            const lectures = await Lectures.find()

            return lectures
        },
        getLecture: async (_, {username, shortid}) => {
            const lecture = await Lectures.findOne({shortid})

            return lecture
        },
        makeLectureResource: async (_, {username, id, title, category, url}) => {
            const profile = await Profiles.findOne({username})
            const lecture = await Lectures.findOne({shortid: id})
        
            if (profile && lecture) {
                
                let shortid = get_id()

                lecture.resources = [...lecture.resources, {
                    shortid,
                    name: profile.username,
                    title,
                    category,
                    url
                }]

                lecture.resources = slicer(lecture.resources, 20)
            
                await Lectures.updateOne({shortid: id}, {$set: lecture})

                return 'Success'
            }

            return 'Error'
        },
        manageLectureManuscript: async (_, {username, id, option, headline, tool, size, photo_url, coll_id}) => {
            const profile = await Profiles.findOne({username})
            const lecture = await Lectures.findOne({shortid: id})
        
            if (profile && lecture) {
                if (option === 'create') {

                    let shortid = get_id()

                    lecture.manuscripts = [...lecture.manuscripts, {
                        shortid,
                        name: profile.username,
                        headline,
                        tool,
                        size,
                        photo_url,
                        likes: 0
                    }]

                    lecture.manuscripts = slicer(lecture.manuscripts, 20)

                } else if (option === 'like') {

                    lecture.manuscripts.map(el => {
                        if (el.shortid === coll_id) {
                            el.likes += 1
                        }
                    })

                } else {

                    lecture.manuscripts = lecture.manuscripts.filter(el => el.shortid !== coll_id)
                }

                await Lectures.updateOne({shortid: id}, {$set: lecture})

                return 'Success'
            }

            return 'Error'
        },
        subscribeLecture: async (_, {username, id}) => {
            const profile = await Profiles.findOne({username})
            const lecture = await Lectures.findOne({shortid: id})
        
            if (profile && lecture) {
                
                profile.account_components = [...profile.account_components, {
                    shortid: lecture.shortid,
                    title: lecture.title,
                    path: 'lecture'
                }]

                await Profiles.updateOne({username}, {$set: profile})

                return 'Success'
            }

            return 'Error'
        },
        createWorkshop: async (_, {username, id, title, category, tasks, dateUp, time, region, cords, role}) => {
            const profile = await Profiles.findOne({username, account_id: id})
            const workshop = await Workshops.findOne({username, title, category, tasks, dateUp, time, region, cords})
        
            if (profile && !workshop) {
                if (profile.account_components.filter(el => el.path === 'workshop').find(el => el.title === title) === undefined) {

                    let shortid = get_id()
                    
                    profile.account_components = [...profile.account_components, {
                        shortid,
                        title,
                        path: 'workshop'
                    }]

                    const newWorkshop = new Workshops({
                        shortid,
                        account_id: profile.account_id,
                        username: profile.username,
                        title,
                        category,
                        tasks,
                        dateUp,
                        time,
                        region,
                        cords,
                        telegram_tag: profile.telegram_tag,
                        members: [{
                            account_id: profile.account_id,
                            username: profile.username,
                            role,
                            task: ''
                        }],
                        images: []
                    })

                    await Profiles.updateOne({username, account_id: id}, {$set: profile})
                    await newWorkshop.save()
                
                    return 'Success'
                }
            }
        
            return 'Success'
        },
        getWorkshops: async (_, {username}) => {
            const workshops = await Workshops.find()

            return workshops
        },
        getWorkshop: async (_, {username, shortid}) => {
            const workshop = await Workshops.findOne({shortid})

            return workshop
        },
        manageWorkshopStatus: async (_, {username, id, option, role, task}) => {
            const profile = await Profiles.findOne({username})
            const workshop = await Workshops.findOne({shortid: id})
        
            if (profile && workshop) {
                if (option === 'join') {

                    profile.account_components = [...profile.account_components, {
                        shortid: workshop.shortid,
                        title: workshop.title,
                        path: 'workshop'
                    }]

                    workshop.members = [...workshop.members, {
                        account_id: profile.account_id,
                        username: profile.username,
                        role,
                        task
                    }]

                } else if (option === 'update') {

                    workshop.members.map(el => {
                        if (el.account_id === profile.account_id) {
                            el.role = role
                        }
                    })

                } else {

                    profile.account_components = profile.account_components.filter(el => el.shortid !== workshop.shortid)
                
                    workshop.members = workshop.members.filter(el => el.account_id !== profile.account_id)
                }

                await Profiles.updateOne({username}, {$set: profile})
                await Workshops.updateOne({shortid: id}, {$set: workshop})

                return 'Success'
            }

            return 'Error'
        },
        updateWorkshopTask: async (_, {username, id, coll_id, piece}) => {
            const profile = await Profiles.findOne({username})
            const workshop = await Workshops.findOne({shortid: id})
        
            if (profile && workshop) {

                workshop.tasks.map(el => {
                    if (el.id === coll_id) {
                        el.progress += piece
                    }
                })

                await Workshops.updateOne({shortid: id}, {$set: workshop})

                return 'Success'
            }

            return 'Error'
        },
        manageWorkshopImage: async (_, {username, id, option, title, category, photo_url, coll_id}) => {
            const profile = await Profiles.findOne({username})
            const workshop = await Workshops.findOne({shortid: id})
        
            if (profile && workshop) {
                if (option === 'create') {

                    let shortid = get_id()
                
                    workshop.images = [...workshop.images, {
                        shortid,
                        name: profile.username,
                        title,
                        category,
                        photo_url,
                        likes: 0
                    }]

                    workshop.images = slicer(workshop.images, 20)

                } else if (option === 'like') {

                    workshop.images.map(el => {
                        if (el.shortid === coll_id) {
                            el.likes += 1
                        }
                    })

                } else {

                    workshop.images = workshop.images.filter(el => el.shortid !== coll_id)
                }

                await Workshops.updateOne({shortid: id}, {$set: workshop})

                return 'Success'
            }

            return 'Error'
        },
        createMiracle: async (_, {username, id, title, category, century, region, cords, rating}) => {
            const profile = await Profiles.findOne({username, account_id: id})
            const miracle = await Miracles.findOne({username, title, category, century, region, cords, rating})
        
            if (profile && !miracle) {
                if (profile.account_components.filter(el => el.path === 'miracle').find(el => el.title === title) === undefined) {

                    let shortid = get_id()

                    profile.account_components = [...profile.account_components, {
                        shortid,
                        title,
                        path: 'miracle'
                    }]      

                    const newMiracle = new Miracles({
                        shortid,
                        account_id: profile.account_id,
                        username: profile.username,
                        title,
                        category,
                        century,
                        region,
                        cords,
                        rating,
                        questions: [],
                        buildings: []
                    })

                    await Profiles.updateOne({username, account_id: id}, {$set: profile})
                    await newMiracle.save()

                    return 'Success'
                }
            }

            return 'Error'
        },
        getMiracles: async (_, {username}) => {
            const miracles = await Miracles.find()

            return miracles
        },
        getMiracle: async (_, {username, shortid}) => {
            const miracle = await Miracles.findOne({shortid})

            return miracle
        },
        makeMiracleQuestion: async (_, {username, id, text, level, answer}) => {
            const profile = await Profiles.findOne({username})
            const miracle = await Miracles.findOne({shortid: id})
        
            if (profile && miracle) {
                
                let shortid = get_id()

                miracle.questions = [...miracle.questions, {
                    shortid,
                    name: profile.username,
                    text,
                    level,
                    answer
                }]

                miracle.questions = slicer(miracle.questions, 20)

                await Miracles.updateOne({shortid: id}, {$set: miracle})

                return 'Success'
            }

            return 'Error'
        },
        updateMiracleRating: async (_, {username, id, rating}) => {
            const profile = await Profiles.findOne({username})
            const miracle = await Miracles.findOne({shortid: id})
        
            if (profile && miracle) {

                miracle.rating = rating
              
                await Miracles.updateOne({shortid: id}, {$set: miracle})

                return 'Success'
            }

            return 'Error'
        },
        manageMiracleBuilding: async (_, {username, id, option, title, category, cords, photo_url, coll_id}) => {
            const profile = await Profiles.findOne({username})
            const miracle = await Miracles.findOne({shortid: id})
        
            if (profile && miracle) {
                if (option === 'create') {

                    let shortid = get_id()

                    miracle.buildings = [...miracle.buildings, {
                        shortid,
                        name: profile.username,
                        title,
                        category,
                        cords,
                        photo_url,
                        likes: 0
                    }]

                    miracle.buildings = slicer(miracle.buildings, 20)

                } else if (option === 'like') {

                    miracle.buildings.map(el => {
                        if (el.shortid === coll_id) {
                            el.likes += 1
                        }
                    })

                } else {
                    
                    miracle.buildings = miracle.buildings.filter(el => el.shortid !== coll_id)
                }

                await Miracles.updateOne({shortid: id}, {$set: miracle})

                return 'Success'
            }

            return 'Error'
        }
       



    }
}

apollo_start(typeDefs, resolvers, app)

app.listen(PORT, () => console.log(`Server started on ${PORT} port`))
