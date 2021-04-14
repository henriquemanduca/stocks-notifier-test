import * as nodeSchedule from 'node-schedule'

class NodeCronFactory {
  static newCron (schedule: string, _callback: () => void): nodeSchedule.Job {
    return nodeSchedule.scheduleJob(schedule, _callback)
  }
}

export default NodeCronFactory
