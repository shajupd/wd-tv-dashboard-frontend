export class AppUtils {
    static getScoreColor = (score: number) => {
        if (!score || score == -1) return 'border border-gray-500'
        if (score >= 21) return 'bg-green-500'
        if (score >= 11) return 'bg-orange-400'
        if (score <= 10) return 'bg-red-500'
        return 'bg-red-500'
    }

    static getScoreColorOverall = (score: number) => {
        if (!score || score == -1) return 'border border-gray-500'
        if (score >= 67) return 'bg-green-500'
        if (score >= 34) return 'bg-orange-400'
        if (score < 33) return 'bg-red-400'
        return 'bg-red-500'

    }

    static getScoreTextColor = (score: number) => {
        if (!score || score == -1) return 'text-gray-500'
        if (score >= 21) return 'text-green-500'
        if (score >= 11) return 'text-orange-400'
        if (score >= 10) return 'text-red-500'
        return 'text-red-500'
    }

    static getScoreTextColorOverall = (score: number) => {
        if (score >= 67) return 'text-green-500'
        if (score >= 34) return 'text-orange-400'
        if (score < 33) return 'text-red-400'
        return 'text-red-500'
    }



    static getScore = (value: number) => {
        if (value >= 90) return 30
        if (value >= 50) return 20
        return 10
    }
    static calculateTotalScore = (data: any) => {
        const marketingScore = (this.getScore(data?.marketing.cpl) + this.getScore(data?.marketing.qualityLead) + this.getScore(data?.marketing.cac)) / 3
        const financeScore = (this.getScore(data?.finance.payOnTime) + this.getScore(data?.finance.budgetUtilization) + this.getScore(data?.finance.clientProfitability)) / 3
        const engagementScore = (this.getScore(data?.engagement.meetingAttendance) + this.getScore(data?.engagement.clientSupportResponse) + this.getScore(data?.engagement.approvalTime)) / 3

        return Math.round((marketingScore * 0.5 + financeScore * 0.3 + engagementScore * 0.2) / 0.3)
    }
}