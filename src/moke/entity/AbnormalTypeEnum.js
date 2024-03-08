
const AbnormalTypeEnum = {
  //BigData - Spark
  '1001':{
    name: 'Spark-IO错误',
    content: `
    java.io.IOException: Failed to delete: /opt/hdfs/nodemanager/usercache/curi/appcache/application_1448006111297_0137/blockmgr-0395885c-99ff-427e-885a-34d036a28999
\tat org.apache.spark.util.Utils$.deleteRecursively(Utils.scala:928)
\tat org.apache.spark.storage.DiskBlockManager$$anonfun$org$apache$spark$storage$DiskBlockManager$$doStop$1.apply(DiskBlockManager.scala:174)
\tat org.apache.spark.storage.DiskBlockManager$$anonfun$org$apache$spark$storage$DiskBlockManager$$doStop$1.apply(DiskBlockManager.scala:170)
\tat scala.collection.IndexedSeqOptimized$class.foreach(IndexedSeqOptimized.scala:33)
\tat scala.collection.mutable.ArrayOps$ofRef.foreach(ArrayOps.scala:108)
\tat org.apache.spark.storage.DiskBlockManager.org$apache$spark$storage$DiskBlockManager$$doStop(DiskBlockManager.scala:170)
\tat org.apache.spark.storage.DiskBlockManager.stop(DiskBlockManager.scala:162)
\tat org.apache.spark.storage.BlockManager.stop(BlockManager.scala:1233)
\tat org.apache.spark.SparkEnv.stop(SparkEnv.scala:96)
\tat org.apache.spark.executor.Executor.stop(Executor.scala:143)
\tat org.apache.spark.executor.CoarseGrainedExecutorBackend$$anonfun$receive$1.applyOrElse(CoarseGrainedExecutorBackend.scala:115)
\tat org.apache.spark.rpc.netty.Inbox$$anonfun$process$1.apply$mcV$sp(Inbox.scala:116)
\tat org.apache.spark.rpc.netty.Inbox.safelyCall(Inbox.scala:204)
\tat org.apache.spark.rpc.netty.Inbox.process(Inbox.scala:100)
\tat org.apache.spark.rpc.netty.Dispatcher$MessageLoop.run(Dispatcher.scala:215)
\tat java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1145)
\tat java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:615)
\tat java.lang.Thread.run(Thread.java:745)
    `,
    solution:`
    确认文件或目录是否存在： 确保指定的路径下的文件或目录确实存在。

检查权限： 确保执行删除操作的用户具有足够的权限，包括对父目录的写权限。

检查文件是否被占用： 确保没有其他进程正在使用该文件或目录。您可以使用操作系统的工具来查看文件的占用情况。

检查文件系统状态： 检查文件系统是否正常，没有只读等问题。

验证路径的正确性： 确保指定的路径中的所有目录都存在，没有拼写错误或其他问题。
    `,
  },
  '1002':{
    name: 'Spark-Task Exception',
    content: `
    16/04/07 10:46:31 WARN executor.CoarseGrainedExecutorBackend: An unknown (mesos-slave-24:43670) driver disconnected.
16/04/07 10:46:31 ERROR executor.CoarseGrainedExecutorBackend: Driver 10.10.34.34:43670 disassociated! Shutting down.
16/04/07 10:46:31 ERROR executor.Executor: Exception in task 8.0 in stage 0.0 (TID 11)
java.io.IOException: Failed to create local dir in /opt/hdfs/nodemanager/usercache/curi/appcache/application_1448006111297_0137/blockmgr-bcb1cfe2-beb8-4f46-b500-2a6945695a47/04.
\tat org.apache.spark.storage.DiskBlockManager.getFile(DiskBlockManager.scala:73)
\tat org.apache.spark.storage.DiskBlockManager.getFile(DiskBlockManager.scala:83)
\tat org.apache.spark.shuffle.IndexShuffleBlockResolver.getDataFile(IndexShuffleBlockResolver.scala:53)
\tat org.apache.spark.shuffle.IndexShuffleBlockResolver.writeIndexFileAndCommit(IndexShuffleBlockResolver.scala:154)
\tat org.apache.spark.shuffle.sort.BypassMergeSortShuffleWriter.write(BypassMergeSortShuffleWriter.java:128)
\tat org.apache.spark.scheduler.ShuffleMapTask.runTask(ShuffleMapTask.scala:73)
\tat org.apache.spark.scheduler.ShuffleMapTask.runTask(ShuffleMapTask.scala:41)
\tat org.apache.spark.scheduler.Task.run(Task.scala:89)
\tat org.apache.spark.executor.Executor$TaskRunner.run(Executor.scala:213)
\tat java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1145)
\tat java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:615)
\tat java.lang.Thread.run(Thread.java:745)
    `,
    solution:`根据错误信息，查询Spark任务失败，查看失败原因。`
  },
  //AIoT
  '4001':{
    name: 'AIoT-0x7880/-30848/MBEDTLS_ERR_SSL_PEER_CLOSE_NOTIFY',
    content: '云端把SSL连接断开了：The peer notified us that the connection is going to be closed',
    solution:`设备端数据连接过于频繁, 触发云端限流, 断开设备
建议关闭设备, 等待一段时间（5分钟以后）再发起连接重试，观察错误仍会出现
有多个设备使用相同的productKey和deviceName与云端建立连接，导致被云端踢下线
建议检查当前使用的设备证书（ProductKey、DeviceName、DeviceSecret）是否可能被他人使用
设备端保活出错, 没有及时发送 MQTT ping packet，或者被发送了没有及时到达云端
建议用抓包等方式确认心跳包有成功发出或者观察有没有收到来自服务端的 MQTT ping response
如果一次都不能连接成功，可以考虑是不是大小端字节序不匹配
目前C-SDK 默认是适配小端设备, 如果需在大端硬件上工作，请添加全局编译选项 REVERSED`
  },
  '4002':{
    name: 'AIoT-0x7200/-29184/MBEDTLS_ERR_SSL_INVALID_RECORD',
    content: '收到非法数据：An invalid SSL record was received',
    solution:`TCP/IP协议栈收到的数据包出错, 需要排查协议栈方面问题
SSL所运行的线程栈被设置的过小, 需调整线程栈大小
SSL被配置的最大报文长度太小, 当网络报文长度超过该数值时, 则可能出现0x7200错误
可调整 MBEDTLS_SSL_MAX_CONTENT_LEN 的值, 重新编译再试
MBEDTLS_SSL_MAX_CONTENT_LEN 的值, 目前已知最小不能小于 4096`
  },
  getRandomEnum() {
    return AbnormalTypeEnum['1001']
  }
}


export default AbnormalTypeEnum
